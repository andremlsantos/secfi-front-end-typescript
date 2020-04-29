import IGraph from "./IGraph";

interface IState {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number;
  onChangeFromCurrency?: Function;
  onChangeToCurrency?: Function;
  onChangeAmount?: Function;
  graphData?: IGraph;
}

export default IState;
