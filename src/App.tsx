import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useTodos } from "./hooks/useTodos";
import { useState } from "react";
import todoService from "./services/todo.service";

function App() {
  const { isError, isLoading, refetch, data, error, isSuccess } = useTodos();
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(title);
  };

  const { mutate } = useMutation({
    mutationKey: ["create todo"],
    mutationFn: (title: string) => todoService.create(title),
    onSuccess() {
      setTitle("");
      alert("Todo created!");
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div>
        <h2>Create Todo:</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <button>Create post</button>
        </form>
      </div>
      <div className="todos">
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
    </div>
  );
}

export default App;
