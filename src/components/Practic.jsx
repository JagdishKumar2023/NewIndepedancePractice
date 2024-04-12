import React, { useReducer, useState } from "react";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), text: action.payload, isComplete: false },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, isComplete: !todo.isComplete }
          : todo
      );
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

const Practic = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch({ type: "ADD_TODO", payload: newTodo });
    } else {
      console.log("Not be new to-do add");
    }
    setNewTodo("");
  };

  const toggle = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const removeTodo = (id) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter placeholder"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.isComplete ? "line-through" : "none",
                margin: "40px",
                cursor: "pointer",
              }}
              onClick={() => toggle(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Practic;
