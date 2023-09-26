import React from "react";
import { Link } from "react-router-dom";
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import Login from "./Login";

const NavBar = ({ auth }) => {
  return (
    <header>
      <div className="title-container">
        <h1>
          <Link className="title" to="/">
            Collectors Corner
          </Link>
        </h1>
      </div>
      <div className="nav-container">
        <Link className="nav-link" to="/items">
          Collector's Items
        </Link>
        {auth.id ? (
         <Link
         className="nav-link"
         to="/collection"
         >
         {auth.username}'s Collection
         </Link>
      ) : (
        null
        )}
        {/* <Link className="nav-link" to="/collection">
          Your Collection
        </Link> */}
        <Link className="nav-link" to="/aboutUs">
          About Us
        </Link>
        {auth.id ? (
         <Link
         className="nav-link"
         to={auth.isAdmin ? "/admin/info" : "/user/info"}
         >
         {auth.username}'s Account
         </Link>
      ) : (
         <Link className="nav-link" to="/login">
         Login / Register
         </Link>
         
        )}

      </div>
    </header>
  );
};

export default NavBar;
