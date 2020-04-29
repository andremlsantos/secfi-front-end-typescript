import IRepository from "../interfaces/IRepository";
import IGraph from "../interfaces/IGraph";

export class Storage implements IRepository {
  map: Map<string, any>;

  constructor() {
    this.map = new Map();
  }

  getExchangeKey(from: string, to: string): string {
    return `${from}-${to}`;
  }

  saveExchangeValue(from: string, to: string, exchangeRate: number): void {
    const key = this.getExchangeKey(from, to);
    const value = exchangeRate;
    console.log("saving", key, value);
    this.map.set(key, value);

    const reversedKey = this.getExchangeKey(to, from);
    const reversedValue = 1 / exchangeRate;
    console.log("saving", reversedKey, reversedValue);
    this.map.set(reversedKey, reversedValue);
  }

  removeExchangeValue(from: string, to: string): void {
    const key = this.getExchangeKey(from, to);
    this.removeValue(key);

    const reversedKey = this.getExchangeKey(to, from);
    this.removeValue(reversedKey);
  }

  getDailyKey(from: string, to: string): string {
    return `${from}-daily-${to}`;
  }

  saveDailyValue(from: string, to: string, data: IGraph): void {
    const key = this.getDailyKey(from, to);
    this.map.set(key, data);
  }

  removeDailyValue(from: string, to: string): void {
    const key = this.getDailyKey(from, to);
    this.removeValue(key);
  }

  getValue(key: string): any {
    return this.map.get(key);
  }

  isPresent(key: string): boolean {
    return this.map.get(key) != null;
  }

  removeValue(key: string): void {
    this.map.delete(key);
  }
}

export default Storage;
