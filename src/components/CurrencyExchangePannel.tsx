import React, { Component, MouseEvent } from "react";
import IState from "../interfaces/IState";
import "../css/CurrencyExchangePannel.css";

export class CurrencyExchangePannel extends Component<IState> {
  changeFromCurrency(currency: string): void {
    if (this.props.onChangeFromCurrency) {
      this.props.onChangeFromCurrency(currency);
    }
  }

  changeToCurrency(currency: string): void {
    if (this.props.onChangeToCurrency) {
      this.props.onChangeToCurrency(currency);
    }
  }

  changeAmount(amount: string): void {
    if (this.props.onChangeAmount) {
      this.props.onChangeAmount(parseInt(amount));
    }
  }

  render() {
    return (
      <div className="container">
        <div className="from_currency_panel">
          <select
            id="from_currency_select"
            value={this.props.fromCurrency.toString()}
            onChange={(e) => this.changeFromCurrency(e.target.value)}
          >
            <option value="AED">AED</option>
            <option value="ARS">ARS</option>
            <option value="AUD">AUD</option>
            <option value="BGN">BGN</option>
            <option value="BRL">BRL</option>
            <option value="BSD">BSD</option>
            <option value="CAD">CAD</option>
            <option value="CHF">CHF</option>
            <option value="CLP">CLP</option>
            <option value="CNY">CNY</option>
            <option value="COP">COP</option>
            <option value="CZK">CZK</option>
            <option value="DKK">DKK</option>
            <option value="DOP">DOP</option>
            <option value="EGP">EGP</option>
            <option value="EUR">EUR</option>
            <option value="FJD">FJD</option>
            <option value="GBP">GBP</option>
            <option value="GTQ">GTQ</option>
            <option value="HKD">HKD</option>
            <option value="HRK">HRK</option>
            <option value="HUF">HUF</option>
            <option value="IDR">IDR</option>
            <option value="ILS">ILS</option>
            <option value="INR">INR</option>
            <option value="ISK">ISK</option>
            <option value="JPY">JPY</option>
            <option value="KRW">KRW</option>
            <option value="KZT">KZT</option>
            <option value="MXN">MXN</option>
            <option value="MYR">MYR</option>
            <option value="NOK">NOK</option>
            <option value="NZD">NZD</option>
            <option value="PAB">PAB</option>
            <option value="PEN">PEN</option>
            <option value="PHP">PHP</option>
            <option value="PKR">PKR</option>
            <option value="PLN">PLN</option>
            <option value="PYG">PYG</option>
            <option value="RON">RON</option>
            <option value="RUB">RUB</option>
            <option value="SAR">SAR</option>
            <option value="SEK">SEK</option>
            <option value="SGD">SGD</option>
            <option value="THB">THB</option>
            <option value="TRY">TRY</option>
            <option value="TWD">TWD</option>
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="UYU">UYU</option>
            <option value="VND">VND</option>
            <option value="ZAR">ZAR</option>
          </select>
          <input
            type="number"
            id="from_amount"
            placeholder="1"
            min="1"
            max="100"
            onChange={(e) => this.changeAmount(e.target.value)}
          />
        </div>

        <div className="middle_panel">
          <div className="result">
            <p>
              {this.props.amount} {this.props.fromCurrency} ={" "}
              {this.props.result} {this.props.toCurrency}{" "}
            </p>
          </div>
        </div>

        <div className="to_currency_panel">
          <select
            id="to_currency_select"
            value={this.props.toCurrency.toString()}
            onChange={(e) => this.changeToCurrency(e.target.value)}
          >
            <option value="AED">AED</option>
            <option value="ARS">ARS</option>
            <option value="AUD">AUD</option>
            <option value="BGN">BGN</option>
            <option value="BRL">BRL</option>
            <option value="BSD">BSD</option>
            <option value="CAD">CAD</option>
            <option value="CHF">CHF</option>
            <option value="CLP">CLP</option>
            <option value="CNY">CNY</option>
            <option value="COP">COP</option>
            <option value="CZK">CZK</option>
            <option value="DKK">DKK</option>
            <option value="DOP">DOP</option>
            <option value="EGP">EGP</option>
            <option value="EUR">EUR</option>
            <option value="FJD">FJD</option>
            <option value="GBP">GBP</option>
            <option value="GTQ">GTQ</option>
            <option value="HKD">HKD</option>
            <option value="HRK">HRK</option>
            <option value="HUF">HUF</option>
            <option value="IDR">IDR</option>
            <option value="ILS">ILS</option>
            <option value="INR">INR</option>
            <option value="ISK">ISK</option>
            <option value="JPY">JPY</option>
            <option value="KRW">KRW</option>
            <option value="KZT">KZT</option>
            <option value="MXN">MXN</option>
            <option value="MYR">MYR</option>
            <option value="NOK">NOK</option>
            <option value="NZD">NZD</option>
            <option value="PAB">PAB</option>
            <option value="PEN">PEN</option>
            <option value="PHP">PHP</option>
            <option value="PKR">PKR</option>
            <option value="PLN">PLN</option>
            <option value="PYG">PYG</option>
            <option value="RON">RON</option>
            <option value="RUB">RUB</option>
            <option value="SAR">SAR</option>
            <option value="SEK">SEK</option>
            <option value="SGD">SGD</option>
            <option value="THB">THB</option>
            <option value="TRY">TRY</option>
            <option value="TWD">TWD</option>
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="UYU">UYU</option>
            <option value="VND">VND</option>
            <option value="ZAR">ZAR</option>
          </select>
          <input
            disabled
            type="number"
            id="from_ammount"
            placeholder={this.props.result.toString()}
            min="1"
            max="100"
          />
        </div>
      </div>
    );
  }
}

export default CurrencyExchangePannel;
