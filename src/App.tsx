import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ITodo } from "./app.interface";
import todoService from "./services/todo.service";

const todoId = 1;

function App() {
  const { isError, isLoading, data, error, isSuccess } = useQuery({
    queryKey: ["todos"],
    queryFn: () => todoService.getAll(),
    select: ({ data }) => data,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      {data?.length ? (
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
