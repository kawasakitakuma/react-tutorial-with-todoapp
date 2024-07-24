import "./App.css";
import TodoList from "./TodoList";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  //todosという変数を用意します。 値を変更したい際はsetTodosを使用してください。 その際の初期値は"Todo1", "Todo2"です。
  const [todos, setTodos] = useState([]);

  //簡単に要素を取得できるようにするやつ
  const todoNameRef = useRef();

  const handleAddToDo = () => {
    //タスクを追加
    // console.log(todoNameRef.current.value);
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    //直接値を変えるのはよろしくないのでコピーする
    const newTodos = [...todos];
    //引数のidとtodoのidが一致させるか確認
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAddToDo}>タスクを追加</button>
      <button onClick={handleClear}>完了したタスクの削除</button>
      <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
    </>
  );
}
