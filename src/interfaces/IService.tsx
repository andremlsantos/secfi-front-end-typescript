import IRepository from "./IRepository";
import IGraph from "./IGraph";

interface IService {
  API_KEY: string;
  storage: IRepository;
  fetchExchangeRate(from: string, to: string, amount: number): Promise<any>;
  fetchDailyGraph(from: string, to: string): Promise<IGraph>;
}

export default IService;
