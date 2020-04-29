import IGraph from "./IGraph";

interface IRepository {
  getDailyKey(from: string, to: string): string;
  getExchangeKey(from: string, to: string): string;

  saveExchangeValue(from: string, to: string, exchangeRate: number): void;
  saveDailyValue(from: string, to: string, data: IGraph): void;

  removeExchangeValue(from: string, to: string): void;
  removeDailyValue(from: string, to: string): void;

  getValue(key: string): any;
  isPresent(key: string): boolean;
  removeValue(key: string): void;
}

export default IRepository;
