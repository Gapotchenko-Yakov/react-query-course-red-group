import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ITodo } from "./app.interface";

const todoId = 1;

function App() {
  const { isError, isPending, data, error, isSuccess } = useQuery({
    queryKey: ["todos", todoId],
    queryFn: () =>
      axios.get<ITodo>(`https://jsonplaceholder.typicode.com/todos/1`),
    select: ({ data }) => data,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return <div>{isSuccess ? <h1>Todo: {data?.title}</h1> : null}</div>;
}

export default App;
