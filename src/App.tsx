import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useTodos } from "./hooks/useTodos";

function App() {
  const { isError, isLoading, refetch, data, error, isSuccess } = useTodos();

  const queryClient = useQueryClient();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <button
        onClick={() => queryClient.invalidateQueries({ queryKey: ["todos"] })}
      >
        Refresh
      </button>
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
