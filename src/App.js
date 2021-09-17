import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TodoTitle from "./components/TodoTitle";
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";
import { useState, useEffect } from "react";

function App() {
  // localStorage.setItem("todoList", []);
  const tmp = JSON.parse(localStorage.getItem("todoList"));
  const [todoList, setTodos] = useState(tmp === null ? [] : tmp);

  const [filterTodos, setFilterTodos] = useState(todoList);
  const [isAdding, setisAdding] = useState(true);
  const [fixingTodo, setFixingTodo] = useState(null);

  useEffect(() => {
    setFilterTodos(todoList);
  }, [todoList]);

  return (
    <div className="container">
      <TodoTitle />
      <div className="content">
        {isAdding ? (
          <TodoAdd
            todoList={todoList}
            setTodo={setTodos}
            isAdding={isAdding}
            setisAdding={setisAdding}
            fixingTodo={fixingTodo}
            setFixingTodo={setFixingTodo}
          />
        ) : null}
        <TodoList
          todoList={todoList}
          setTodo={setTodos}
          setisAdding={setisAdding}
          fixingTodo={fixingTodo}
          setFixingTodo={setFixingTodo}
          filterTodos={filterTodos}
          setFilterTodos={setFilterTodos}
        />
      </div>
    </div>
  );
}

export default App;
