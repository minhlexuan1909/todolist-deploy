import React, { useState, useEffect } from "react";
import { v1 as uuidv1 } from "uuid";
import "./todoAdd.css";

export default function TodoAdd({
  todoList,
  setTodo,
  isAdding,
  setisAdding,
  fixingTodo,
  setFixingTodo,
}) {
  const [newTodo, setNewTodo] = useState({
    id: 1,
    name: "",
    level: "Nguy cấp",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Lợi dụng useEffect để bắt sự thay đổi của fixingTodo để biết được đang ở chức năng Sửa và thay đổi isEditing mà không cần tạo và truyền nó từ App
  useEffect(() => {
    if (fixingTodo != null) {
      console.log("hello");
      setIsEditing(true);
      setNewTodo(fixingTodo);

      // setisAdding(true);
    }
    return () => {};
  }, [fixingTodo]);

  const updateNewTodo = (e) => {
    const { name, value } = e.target;
    // e.target =<input type="text" name="name" value={newTodo.name}/>
    // console.log(e.target);
    setNewTodo({
      ...newTodo,
      // Destructuring newTodo, lấy ra name thay bằng value của input
      [name]: value,
    });
  };

  const addNewTodo = () => {
    newTodo.id = uuidv1();
    setTodo([...todoList, newTodo]);
    setNewTodo({
      id: 1,
      name: "Pending",
      level: "Nguy cấp",
    });
  };
  const turnOffAdding = () => {
    setisAdding(false);
    setIsEditing(false);
    setFixingTodo(null);
  };
  const addBtnOnClick = () => {
    addNewTodo();
    // turnOffAdding();
  };
  const handleFixBtn = () => {
    let index = todoList.findIndex((item) => item.id === newTodo.id);
    todoList[index] = newTodo;
    // localStorage.setItem("todoList", JSON.stringify(todoList));
    setTodo([...todoList]);
    setIsEditing(false);
    setFixingTodo(null);
    turnOffAdding();
  };
  return (
    <div className="todoAdd">
      <div className="todoAdd__container">
        <div className="todoAdd__header">
          <h3>{isEditing ? "Sửa công việc" : "Thêm công việc"}</h3>
        </div>
        <div className="todoAdd__inputField">
          <div className="inputField__section">
            <div className="todoAdd__title">Tên công việc</div>
            <input
              className="todoAdd__input"
              type="text"
              name="name"
              value={newTodo.name}
              onChange={updateNewTodo}
              placeholder="Điền tên công việc"
            />
          </div>

          <div className="inputField__section">
            <div className="todoAdd__title">Mức độ</div>
            <select
              name="level"
              className="todoAdd__input"
              onChange={updateNewTodo}
              value={newTodo.level}
            >
              <option value="Nguy cấp">Nguy cấp</option>
              <option value="Bình thường">Bình thường</option>
              <option value="Còn chán mới cần">Còn chán mới cần</option>
            </select>
          </div>
        </div>
        <div className="todoAdd__btns">
          <button
            className="todoAdd__addBtn btn"
            onClick={isEditing ? handleFixBtn : addBtnOnClick}
          >
            {isEditing ? "Sửa" : "Thêm"}
          </button>
          <button className="todoAdd__cancelBtn btn" onClick={turnOffAdding}>
            Huỷ bỏ
          </button>
        </div>
      </div>
    </div>
  );
}
