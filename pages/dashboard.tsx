import React, { useEffect, useState } from "react";
import {
  addTodoItem,
  listenToDataChange,
  removeItem,
  updateItem,
} from "../libs/firebaseApp";

function Dashboard() {
  const [todoTitle, setTodoTitle] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
  });

  const [todoList, setTodoList] = useState<
    Array<{ key: string; title: string; done: boolean }>
  >([]);

  useEffect(() => {
    console.log("Hey, fetch user from firebase");
    // @ts-ignore
    listenToDataChange(localStorage.getItem("uid"), (data) => {
      setUserData(data);
      const _todos = [];

      for (const key in data.todos) {
        if (Object.prototype.hasOwnProperty.call(data.todos, key)) {
          const td = data.todos[key];
          td.key = key;
          _todos.push(td);
        }
      }
      setTodoList(
        // @ts-ignore
        _todos.sort((a, b) => (parseInt(a.key) < parseInt(b.key) ? 1 : 0))
      );
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.currentTarget.value);
  };

  const handleAddItem = () => {
    // @ts-ignore
    addTodoItem(localStorage.getItem("uid"), {
      done: false,
      createdAt: new Date().toISOString(),
      title: todoTitle,
    })
      .then(() => {
        setTodoTitle("");
      })
      .catch((e) => {
        console.log(e);
        alert("Unable to add item");
      });
  };
  // @ts-ignore
  const handleDoneTodoItem = (item, done = true) => {
    item.done = done;
    item.doneDate = done ? new Date().toISOString() : "";
    // @ts-ignore
    updateItem(localStorage.getItem("uid"), item.key, item);
  };
  // @ts-ignore
  const handleRemoveItem = (item) => {
    if (confirm("Are you sure about this?")) {
      // @ts-ignore
      removeItem(localStorage.getItem("uid"), item.key);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full p-3 bg-green-700 top-bar">
        Welcome Back, {userData.firstName}
      </div>
      <div className="flex main-section">
        <div className="w-full h-full">
          <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
            <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
              <div className="mb-4">
                <h1 className="text-grey-darkest">Todo List</h1>
                <div className="flex mt-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                    placeholder="Add Todo"
                    value={todoTitle}
                    onChange={handleInputChange}
                  />
                  <button
                    onClick={handleAddItem}
                    className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div>
                {todoList.map((todo) => {
                  return (
                    <div className="flex mb-4 items-center" key={todo.key}>
                      <p
                        className={`w-full text-green${
                          todo.done ? " line-through" : ""
                        }`}
                      >
                        {todo.title}
                      </p>
                      <button
                        onClick={() => handleDoneTodoItem(todo, !todo.done)}
                        className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey"
                      >
                        {todo.done ? "Not Done" : "Done"}
                      </button>
                      <button
                        onClick={() => handleRemoveItem(todo)}
                        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
