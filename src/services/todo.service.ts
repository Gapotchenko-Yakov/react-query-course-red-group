import axios from "axios";
import { ITodo } from "../app.interface";

class TodoService {
  private _baseUrl = "https://jsonplaceholder.typicode.com/todos";
  async getById(id: string) {
    return axios.get<ITodo>(`${this._baseUrl}/${id}`);
  }

  async getAll() {
    return axios.get<ITodo[]>(`${this._baseUrl}`);
  }
}

export default new TodoService();
