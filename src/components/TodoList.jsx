import React, { useReducer, useState } from "react";

// Reducer function to manage state updates
const todoReducer = (state, action) => {
  switch (action.type) {
    // When a new to-do is added
    case "ADD_TODO":
      // Add a new to-do item to the state array
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false }, // Create a new to-do item object
      ];
    // When a to-do item is toggled
    case "TOGGLE_TODO":
      // Toggle the completion status of the to-do item with the provided id
      return state.map((todo) =>
        todo.id === action.payload // Find the to-do item with the matching id
          ? { ...todo, completed: !todo.completed } // Toggle the completed status
          : todo
      );
    // When a to-do item is removed
    case "REMOVE_TODO":
      // Remove the to-do item with the provided id from the state array
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

function TodoList() {
  // Initialize state with empty array and useReducer with todoReducer function
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    // Add a new to-do item when the input is not empty
    if (newTodo.trim() !== "") {
      dispatch({ type: "ADD_TODO", payload: newTodo }); // Dispatch an action to add a new to-do
      setNewTodo(""); // Clear the input field
    }
  };

  const toggleTodo = (id) => {
    console.log(id);
    // Toggle the completion status of the to-do item with the provided id
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const removeTodo = (id) => {
    // Remove the to-do item with the provided id
    dispatch({ type: "REMOVE_TODO", payload: id });
  };

  return (
    <div>
      <h1>My Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {/* Render each to-do item */}
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none", // Apply line-through style if completed
                cursor: "pointer", // Change cursor to pointer on hover
              }}
              onClick={() => toggleTodo(todo.id)} // Toggle completion status on click
            >
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>Remove</button>{" "}
            {/* Remove the to-do item on click */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
