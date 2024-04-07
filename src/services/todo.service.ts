import axios from "axios";
import { ICreateTodo, ITodo } from "../app.interface";

class TodoService {
  private _baseUrl = "https://jsonplaceholder.typicode.com/todos";
  async getById(id: string) {
    return axios.get<ITodo>(`${this._baseUrl}/${id}`);
  }

  async getAll() {
    return axios.get<ITodo[]>(`${this._baseUrl}?_start=0&_limit=5`);
  }

  async create(title: string) {
    return axios.post<any, any, ICreateTodo>(this._baseUrl, {
      title,
      userId: 1,
      completed: false,
    });
  }
}

export default new TodoService();
