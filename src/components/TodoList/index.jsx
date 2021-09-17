import { useState } from "react";
import "./todoList.css";
import { Badge, Table } from "react-bootstrap";

const TodoList = ({
  todoList,
  setTodo,
  setisAdding,
  fixingTodo,
  setFixingTodo,
  filterTodos,
  setFilterTodos,
}) => {
  const [selectedSort, setSelectedSort] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const levelArr = ["Nguy cấp", "Bình thường", "Còn chán mới cần"];

  const showAdding = () => {
    setisAdding(true);
  };
  const deleteTodo = (idDelete) => {
    todoList = todoList.filter((item) => item.id !== idDelete);
    setTodo(todoList);
  };
  const updateLevelColor = (text) => {
    if (text === "Nguy cấp") return "danger";
    else if (text === "Bình thường") return "warning";
    else return "success";
  };
  const selectFixTodo = (index) => {
    setFixingTodo(todoList[index]);
    setisAdding(true);
  };
  const sortID = () => {
    todoList.sort((item1, item2) => {
      return item1.id > item2.id ? 1 : -1;
    });
    setTodo([...todoList]);
  };
  const sortName = () => {
    todoList.sort((item1, item2) => {
      return item1.name > item2.name ? 1 : -1;
    });
    setTodo([...todoList]);
  };
  const levelPriority = (level) => {
    if (level === "Nguy cấp") return 3;
    if (level === "Bình thường") return 2;
    else return 1;
  };
  const sortLevel = () => {
    todoList.sort((item1, item2) => {
      return levelPriority(item1.level) > levelPriority(item2.level) ? -1 : 1;
    });
    setTodo([...todoList]);
  };
  const sortTodo = () => {
    if (selectedSort === "ID") sortID();
    else if (selectedSort === "Tên công việc") sortName();
    else if (selectedSort === "Mức độ") sortLevel();
  };
  const updateSelection = (e) => {
    setSelectedSort(e.target.value);
  };
  const changeLevelByClick = (item) => {
    const indexLevel = levelArr.findIndex((level) => level === item.level);
    item.level = levelArr[(indexLevel + 1) % 3];
    setTodo([...todoList]);
    // localStorage.setItem("todoList", JSON.stringify(todoList));
  };
  const groupAndShow = (group) => {
    if (group === "All") setFilterTodos(todoList);
    else {
      const tmpTodos = todoList.filter((item) => item.level === group);
      setFilterTodos(tmpTodos);
    }
  };
  const updateKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };
  const handleSearch = () => {
    if (searchKeyword === "") {
      setFilterTodos([...todoList]);
      return;
    }
    filterTodos = todoList.filter(
      (item) =>
        item.name.toLowerCase().includes(searchKeyword) ||
        item.level.toLowerCase().includes(searchKeyword)
    );
    setFilterTodos([...filterTodos]);
  };
  // __________________________________________________________
  return (
    <div className="todoList">
      <div className="todoList__btns">
        <button className="todoList__addBtn btn" onClick={showAdding}>
          Thêm công việc mới
        </button>
        <div className="todoList__sortSection">
          <select
            className="todoList__sortSelect"
            onChange={(e) => updateSelection(e)}
            name=""
            id=""
          >
            <option value="" selected disabled>
              Chọn điều kiện sắp xếp
            </option>
            <option value="ID">ID</option>
            <option value="Tên công việc">Tên công việc</option>
            <option value="Mức độ">Mức độ</option>
          </select>
          <button className="todoList__sortBtn btn" onClick={sortTodo}>
            Sắp xếp
          </button>
        </div>
        <div className="todoList__search">
          <input
            type="text"
            className="todoList__searchField"
            onChange={updateKeyword}
          />
          <button className="todoList__searchBtn btn" onClick={handleSearch}>
            Tìm kiếm
          </button>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td className="table__title">STT</td>
            <td className="table__title">Tên công việc</td>
            <td className="table__title">Mức độ</td>
            <td className="table__title">Hành động</td>
          </tr>
        </thead>
        {/* {console.log(filterTodos)} */}
        <tbody>
          {filterTodos.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>
                <Badge
                  bg={updateLevelColor(item.level)}
                  onClick={() => changeLevelByClick(item)}
                >
                  {item.level}
                </Badge>
              </td>
              <td>
                <button
                  className="table__fixBtn btn"
                  onClick={() => selectFixTodo(index)}
                >
                  Sửa
                </button>
                <button
                  className="table__deleteBtn btn"
                  onClick={() => deleteTodo(item.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="todoList__levelGroup">
        <span
          className="levelGroup__groupBtn btn"
          onClick={() => groupAndShow("All")}
        >
          Tất cả
        </span>
        <span
          className="levelGroup__groupBtn btn"
          onClick={() => groupAndShow("Nguy cấp")}
        >
          Nguy cấp
        </span>
        <span
          className="levelGroup__groupBtn btn"
          onClick={() => groupAndShow("Bình thường")}
        >
          Bình thường
        </span>
        <span
          className="levelGroup__groupBtn btn"
          onClick={() => groupAndShow("Còn chán mới cần")}
        >
          Còn chán mới cần
        </span>
      </div>
      {localStorage.setItem("todoList", JSON.stringify(todoList))}
    </div>
  );
};

export default TodoList;
