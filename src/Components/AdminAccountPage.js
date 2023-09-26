import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createItemThunk } from "../store/item";
import { logout } from "../store/auth";

const AdminAccountPage = () => {
  const dispatch = useDispatch();

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  const handleItemChange = (ev) => {
    setNewItem({ ...newItem, [ev.target.name]: ev.target.value });
  };

  const addNewItem = (ev) => {
    ev.preventDefault();
    try {
      dispatch(createItemThunk(newItem));
      window.alert("New Item added");
    } catch (error) {
      window.alert("Error adding new item");
    }
  };

  return (
    <div className="main-account-container">
      <div id="user-account-header-container">
        <h1 id="user-name-h1">Admin Dashboard</h1>
        <button>
          <Link to="/" id="logOut-btn" onClick={() => dispatch(logout())}>
            Logout
          </Link>
        </button>
      </div>
      <form onSubmit={addNewItem}>
        <label className="label" htmlFor="name">
          Item Name:
        </label>
        <input
          className="input"
          placeholder="Item Name"
          name="name"
          value={newItem.name}
          onChange={handleItemChange}
        />
        <label className="label" htmlFor="description">
          Item Description:
        </label>
        <input
          className="input"
          placeholder="Item Description"
          name="description"
          value={newItem.description}
          onChange={handleItemChange}
        />
        <label className="label" htmlFor="price">
          Item Price:
        </label>
        <input
          type="number"
          className="input"
          placeholder="Item Price"
          name="price"
          value={newItem.price}
          onChange={handleItemChange}
        />
        <label className="label" htmlFor="imageUrl">
          Item Image URL:
        </label>
        <input
          className="input"
          placeholder="Item image URL"
          name="imageUrl"
          value={newItem.imageUrl}
          onChange={handleItemChange}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AdminAccountPage;
