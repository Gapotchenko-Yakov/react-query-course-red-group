import { useQuery } from "@tanstack/react-query";
import todoService from "../services/todo.service";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => todoService.getAll(),
    select: ({ data }) => data,
    // enabled: false,
    retry: 10,
  });
};
