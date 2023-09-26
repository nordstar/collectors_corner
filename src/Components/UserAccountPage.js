import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout, updateUserInfo } from "../store/auth";
import { logOutCollection } from "../store/collection";
//import { logOutOrders } from "../store/userOrders";

const UserAccountPage = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [user, updateUser] = useState(auth);

  const handleClick = (ev) => {
    updateUser({ credentials: { ...auth, [ev.target.name]: ev.target.value } });
  };

  const userUpdate = (ev) => {
    ev.preventDefault();
    dispatch(updateUserInfo(user.credentials));
  };
  const logoutUser = () => {
    dispatch(logout());
    dispatch(logOutCollection());
    //dispatch(logOutOrders());
  };
  return (
    <div className="main-account-container">
      <div id="user-account-header-container">
        <h1 id="user-name-h1">{auth.username}'s account</h1>
        <button>
          <Link to="/" id="logOut-btn" onClick={() => logoutUser()}>
            Logout
          </Link>
        </button>
      </div>
      <form onSubmit={userUpdate}>
        <label className="label" htmlFor="username">
          User Name:
        </label>
        <input
          className="input"
          placeholder={user.username}
          value={user.username}
          name="username"
          onChange={handleClick}
        />
        <label className="label" htmlFor="email">
          Email:
        </label>
        <input
          className="input"
          placeholder={user.email}
          value={user.email}
          name="email"
          onChange={handleClick}
        />
        <label className="label" htmlFor="password">
          Password:
        </label>
        <input
          className="input"
          placeholder="password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleClick}
        />
        <button type="submit">update info</button>
      </form>
      <section id="useraccount-links">
      {/* <Link className="prev-orders-link" to="/user/orders">
        My Previous orders
      </Link>
      <Link className="user-addreses-link" to="/user/addresses">
        My Addresses
      </Link> */}
      </section>
    </div>
  );
};

export default UserAccountPage;
