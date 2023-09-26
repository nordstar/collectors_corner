import React from "react";
import { Link } from "react-router-dom";
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';


const Home = ({ auth }) => {
  return (
    <header>
      <div className="title-container">
        <h1>
          Welcome to Collector's Corner
        </h1>
        <h3>
         Here you can build your virtual online collection to keep wherever you go.  You can see what items may be missing and buy those items through ebay, or you can track the value of your existing collection.
        </h3>
      </div>

    </header>
  );
};

export default Home;
