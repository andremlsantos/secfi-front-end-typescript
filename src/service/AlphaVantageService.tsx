import IService from "../interfaces/IService";
import IRepository from "../interfaces/IRepository";
import IGraph from "../interfaces/IGraph";

export class AlphaVantageService implements IService {
  API_KEY: string;
  storage: IRepository;

  constructor(apyKey: string, storage: IRepository) {
    this.API_KEY = apyKey;
    this.storage = storage;
  }

  async fetchExchangeRate(
    from: string,
    to: string,
    amount: number
  ): Promise<any> {
    const key = this.storage.getExchangeKey(from, to);

    if (from === to) {
      // we don't need to calculate anything, just return amount
      console.log("from == to, returning amount");
      return amount;
    } else if (this.storage.isPresent(key)) {
      // we can grab the values already saved
      console.log("values already requested");
      let result = this.storage.getValue(key) * amount;
      console.log(result);
      return result.toFixed(4);
    } else {
      let API_CALL = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${this.API_KEY}`;

      return fetch(API_CALL)
        .then((res) => res.json())
        .then((data) => {
          try {
            let exchangeRate = Number(
              data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
            );
            let result: number = amount * exchangeRate;

            // save value
            console.log("saving " + key + "  to map");
            this.storage.saveExchangeValue(from, to, exchangeRate);

            return result.toFixed(4);
          } catch (err) {
            console.error(
              "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day."
            );
            return amount;
          }
        })
        .catch((err) => {
          console.error(err);
          return -1;
        });
    }
  }

  fetchDailyGraph(from: string, to: string): Promise<IGraph> {
    const key = this.storage.getDailyKey(from, to);

    if (this.storage.isPresent(key)) {
      // we already did request, lets return values
      console.log("returning old values from daily");

      return new Promise<IGraph>((resolve, reject) => {
        resolve(this.storage.getValue(key));
      });
    } else {
      let API_CALL = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${from}&to_symbol=${to}&outputsize=compact&apikey=${this.API_KEY}`;
      let dates: Array<string> = [];
      let open: Array<string> = [];
      let high: Array<string> = [];
      let low: Array<string> = [];
      let close: Array<string> = [];

      return fetch(API_CALL)
        .then((res) => res.json())
        .then((data) => {
          if (data["Time Series FX (Daily)"] != null) {
            for (var key in data["Time Series FX (Daily)"]) {
              dates.push(key);
              open.push(data["Time Series FX (Daily)"][key]["1. open"]);
              high.push(data["Time Series FX (Daily)"][key]["2. high"]);
              low.push(data["Time Series FX (Daily)"][key]["3. low"]);
              close.push(data["Time Series FX (Daily)"][key]["4. close"]);
            }

            let result: IGraph = {
              dates: dates.reverse(),
              open: open.reverse(),
              high: high.reverse(),
              low: low.reverse(),
              close: close.reverse(),
              chartData: null,
            };

            console.log(
              "saving " + this.storage.getDailyKey(from, to) + "  to map"
            );
            this.storage.saveDailyValue(from, to, result);

            return result;
          } else {
            // Problems with request, we remove the values...
            console.info(
              "Removing key " +
                this.storage.getDailyKey(from, to) +
                " due problems"
            );
            this.storage.removeDailyValue(from, to);
            // return default value EUR: EUR
            return this.storage.getValue(
              this.storage.getDailyKey("EUR", "EUR")
            );
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
}

export default AlphaVantageService;
