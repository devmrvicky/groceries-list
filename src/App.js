// import "./style.css";
import Header from "./Header";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import Content from "./Content";
import spiner from "./spiner.svg"
import Footer from "./Footer";
import { useState, useEffect } from "react";
import apiRequest from "./apiRequest";

export default function App() {
  const API_URL = "http://localhost:3500/items"

  // Set items state into localStorage
  const [items, setItems] = useState([]);
  // new item state
  const [newItem, setNewItem] = useState("");
  // search item state
  const [search, setSearch] = useState("");
  // error
  const [fetchError, setFetchError] = useState(null)
  // isLoading
  const [isLoading, setIsLoading] = useState(true)

  // Run after render page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data')
        const data = await response.json();
        setItems(data)
        setFetchError(null)
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false)
      }
    };

    setTimeout(() => {
      // (async () => await fetchData())()
      fetchData();
    }, 2000)

  }, []);

  // Add item to items list state
  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    // GET method C --> Create
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions)
    if(result) setFetchError(result)
  };

  // check item if checked or not
  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const myItem = listItems.filter(item => item.id === id);
    // console.log(myItem)
    // PATCH method U --> Update
    const patchOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: myItem[0].checked})
    }
    const result = await apiRequest(`${API_URL}/${id}`, patchOptions);
    if(result) setFetchError(result)
  };

  // Delete item from list and localStorage
  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    // DELETE method D --> Delete
    const deleteOption = { method: 'DELETE' }
    const result = await apiRequest(`${API_URL}/${id}`, deleteOption);
    if(result) setFetchError(result)
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
      <div className="form-control my-2 flex flex-col max-w-lg mx-auto w-11/12">
        <AddItem
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
        />
        <SearchItem search={search} setSearch={setSearch} />
      </div>
      <main className="flex item-center justify-center">
        {isLoading &&
          <img
            src={spiner}
            className="text-center"
            alt="loading"
          />
        }
        {fetchError && <p className="text-red-500 text-center text-lg m-4">{`Error: ${fetchError}`}</p>
        }
        {!fetchError &&
          !isLoading &&
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleDelete={handleDelete}
            handleCheck={handleCheck}
          />
        }
      </main>
      <Footer count={items.length} />
    </div>
  );
}
