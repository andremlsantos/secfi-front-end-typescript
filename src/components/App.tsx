import React from "react";
import Header from "./Header";
import CurrencyExchangePannel from "./CurrencyExchangePannel";
import IState from "../interfaces/IState";
import IService from "../interfaces/IService";
import AlphaVantageService from "../service/AlphaVantageService";
import IApp from "../interfaces/IApp";
import Storage from "../repository/Storage";
import CurrencyDailyGraph from "./CurrencyDailyGraph";
import "../css/App.css";

export class App extends React.Component<{}, IState> implements IApp {
  service: IService;

  constructor(props: {}) {
    super(props);

    let myService: IService = new AlphaVantageService(
      "0VY8POTUN3UDETPX",
      new Storage()
    );
    this.service = myService;

    let myState: IState = {
      fromCurrency: "EUR",
      toCurrency: "EUR",
      amount: 1,
      result: 1,
      onChangeFromCurrency: this.onChangeFromCurrency,
      onChangeToCurrency: this.onChangeToCurrency,
      onChangeAmount: this.onChangeAmount,
    };
    this.state = myState;
  }

  componentDidMount() {
    this.service
      .fetchDailyGraph(this.state.fromCurrency, this.state.toCurrency)
      .then((result) => {
        this.setState({ graphData: result });
      });
  }

  onChangeFromCurrency = (val: string) => {
    this.setState({
      fromCurrency: val,
    });

    this.service
      .fetchExchangeRate(val, this.state.toCurrency, this.state.amount)
      .then((result) => {
        this.setState({ result: result });

        this.service
          .fetchDailyGraph(val, this.state.toCurrency)
          .then((result) => {
            this.setState({ graphData: result });
          });
      });
  };

  onChangeToCurrency = (val: string) => {
    this.setState({
      toCurrency: val,
    });

    this.service
      .fetchExchangeRate(this.state.fromCurrency, val, this.state.amount)
      .then((result) => {
        this.setState({ result: result });

        this.service
          .fetchDailyGraph(this.state.fromCurrency, val)
          .then((result) => {
            this.setState({ graphData: result });
          });
      });
  };

  onChangeAmount = (val: number): void => {
    this.setState({
      amount: val,
    });

    this.service
      .fetchExchangeRate(this.state.fromCurrency, this.state.toCurrency, val)
      .then((result) => {
        this.setState({ result: result });
      });
  };

  render() {
    return (
      <div className="container">
        <Header></Header>
        <CurrencyExchangePannel
          fromCurrency={this.state.fromCurrency}
          toCurrency={this.state.toCurrency}
          amount={this.state.amount}
          result={this.state.result}
          onChangeFromCurrency={this.onChangeFromCurrency}
          onChangeToCurrency={this.onChangeToCurrency}
          onChangeAmount={this.onChangeAmount}
        />
        <CurrencyDailyGraph
          fromCurrency={this.state.fromCurrency}
          toCurrency={this.state.toCurrency}
          amount={this.state.amount}
          result={this.state.result}
          graphData={this.state.graphData}
        />
      </div>
    );
  }
}

export default App;
