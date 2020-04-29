import React, { Component } from "react";
import IState from "../interfaces/IState";
import { Line } from "react-chartjs-2";
import "../css/CurrencyGraph.css";
import IGraph from "../interfaces/IGraph";
import ICurrencyDailyGraph from "../interfaces/ICurrencyDailyGraph";

export class CurrencyDailyGraph extends Component<IState, ICurrencyDailyGraph> {
  constructor(props: IState) {
    super(props);

    this.state = {
      days: 30,
    };
  }

  buildChartData() {
    let data: IGraph;
    const days: number = this.state.days;

    if (this.props.graphData) {
      data = this.props.graphData;
    } else {
      data = {
        chartData: {},
        close: [],
        dates: [],
        high: [],
        low: [],
        open: [],
      };
    }

    return {
      labels: this.filterData(data.dates, days),
      datasets: [
        {
          label: "Close",
          data: this.filterData(data.close, days),
          backgroundColor: ["rgba(255, 99, 132, 0.05)"],
          borderColor: "rgba(255, 99, 132, 0.8)",
          borderDash: [1],
          fill: false,
        },
        {
          label: "Open",
          data: this.filterData(data.open, days),
          backgroundColor: ["rgba(23, 99, 132, 0.05)"],
          borderColor: "rgba(23, 99, 132, 0.8)",
          borderDash: [3],
        },
        {
          label: "High",
          data: this.filterData(data.high, days),
          backgroundColor: ["rgba(44, 173, 221, 0.05)"],
          borderColor: "rgba(44, 173, 221, 0.8)",
          borderDash: [7],
        },
        {
          label: "Low",
          data: this.filterData(data.low, days),
          backgroundColor: ["rgba(170, 161, 17, 0.05)"],
          borderColor: "rgba(170, 161, 17, 0.8)",
          borderDash: [5],
          fill: false,
        },
      ],
    };
  }

  buildChartOptions() {
    return {
      title: {
        display: true,
        text: this.props.fromCurrency + " vs " + this.props.toCurrency,
        fontSize: 25,
        fontColor: "#0E6D90",
      },
      legend: {
        display: true,
        position: "right",
        labels: {
          fontColor: "#0E6D90",
        },
      },
      tooltips: {
        display: true,
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Value",
              fontColor: "#0E6D90",
              fontSize: 20,
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Time",
              fontColor: "#0E6D90",
              fontSize: 20,
            },
          },
        ],
      },
    };
  }

  onChangeDays(days: string) {
    this.setState({
      days: parseInt(days),
    });

    console.log("Updating graph data for ", days, " days");
  }

  filterData(arr: Array<string>, amount: number) {
    return arr.slice(Math.max(arr.length - amount, 0));
  }

  render() {
    return (
      <div className="container">
        <Line data={this.buildChartData()} options={this.buildChartOptions()} />
        <div className="inputContainer">
          <input
            type="range"
            onChange={(e) => this.onChangeDays(e.target.value)}
            step="10"
            min="10"
            max="100"
            value={this.state.days}
          />
          <span>{this.state.days}</span>
        </div>
      </div>
    );
  }
}

export default CurrencyDailyGraph;
