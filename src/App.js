import "./style.css";
import Header from "./Header";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import Content from "./Content";
import Footer from "./Footer";
import { useState, useEffect } from "react";

export default function App() {
  const API_URL = "http://localhost:3500/items"
  
  // Set items state into localStorage
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shopingList")) || []
  );

  // new item state
  const [newItem, setNewItem] = useState("");

  // search item state
  const [search, setSearch] = useState("");

  // Run after render page
  useEffect(() => {
    localStorage.setItem("shopingList", JSON.stringify(items));
  }, [items]);

  // Add item to items list state
  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
  };

  // check item if checked or not
  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
  };

  // Delete item from list and loacalStorage
  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  };

  // Add new item to the list and localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  // console.log(items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase())))

  return (
    <div className="App w-screen flex flex-col h-screen">
      <Header title="Groceries List" />
      <div className="form-control m-2 flex flex-col">
        <AddItem
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
        />
        <SearchItem search={search} setSearch={setSearch} />
      </div>
      <Content
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        handleDelete={handleDelete}
        handleCheck={handleCheck}
      />
      <Footer count={items.length} />
    </div>
  );
}
