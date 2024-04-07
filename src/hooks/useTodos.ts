import { useQuery } from "@tanstack/react-query";
import todoService from "../services/todo.service";
import { AxiosResponse } from "axios";
import { ITodo } from "../app.interface";

const data: AxiosResponse<ITodo[], any> = {
  data: [
    {
      id: 1,
      completed: false,
      title: "hello",
      userId: 1,
    },
  ],
} as AxiosResponse<ITodo[], any>;

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => todoService.getAll(),
    select: ({ data }) => data,
    // enabled: false,
    retry: 5,
    initialData() {
      return data;
    },
  });
};

export const useTodo = () => {
  const todoId = "1";
  return useQuery({
    queryKey: ["todos", todoId],
    queryFn: ({ queryKey }) => todoService.getById(queryKey[1]),
    select: ({ data }) => data,
    enabled: !!todoId,
    retry: 5,
  });
};
