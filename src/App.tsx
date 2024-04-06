import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ITodo } from "./app.interface";
import todoService from "./services/todo.service";
import { useEffect } from "react";
import { useTodos } from "./hooks/useTodos";

const todoId = 1;

function App() {
  const { isError, isLoading, refetch, data, error, isSuccess } = useTodos();

  // useEffect(() => alert(error), [isError]);
  // useEffect(() => alert(data), [data]);

  const {} = useMutation({
    mutationKey: ["delete", todoId],
    mutationFn: () => axios.delete(""),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      {isLoading ? (
        <span>Loading...</span>
      ) : isError ? (
        <span>Error: {error}</span>
      ) : data?.length ? (
        data?.map((todo) => (
          <div>
            <b>{todo.id}</b>
            &nbsp;&nbsp;&nbsp;
            <span>{todo.title}</span>
          </div>
        ))
      ) : (
        <h1> Data not found!</h1>
      )}
    </div>
  );
}

export default App;
