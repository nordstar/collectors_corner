import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllItems } from "../store";
import "../../static/styles.css";

const AllItems = () => {
 // const { auth } = useSelector((state) => state);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const itemsData = await getAllItems();
      setItems(itemsData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h2 className="title">All items</h2>
      <div className="items-container">
        {items.map((item) => (
          <Link to={`/items/${item.id}`} className="item-link">
          <div key={item.id} className="item-card">
            
            <h3 className="title">{item.name}</h3> {item.description}
              <div className="image-div">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="item-image"
              />
              </div>
              <div className="item-details">
                Price Paid: ${item.value}<br></br>
                Item Value: Placeholder 
              </div>
            
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllItems;
