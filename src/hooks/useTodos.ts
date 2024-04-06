import { useQuery } from "@tanstack/react-query";
import todoService from "../services/todo.service";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => todoService.getAll(),
    select: ({ data }) => data,
    // enabled: false,
    retry: 5,
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
