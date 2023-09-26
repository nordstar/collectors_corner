import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Routes, Route } from "react-router-dom";
import UserAccountPage from "./UserAccountPage";
import Login from "./Login";
import Collection from "./Collection";
import AllItems from "./AllItems";
import AdminAccountPage from "./AdminAccountPage";
import SingleItem from "./SingleItem";
// import UserPrevOrders from "./UserPrevOrders";
// import AfterCheckout from "./AfterCheckout";
import Footer from "./Footer";
// import Faq from "./Faq";
// import UserAddresses from "./UserAddresses";
import { fetchCollection } from "../store/collection";
// import Checkout from "./Checkout";
import NavBar from "./NavBar";
import Home from "./Home";
import AboutUs from "./AboutUs";

const App = connect(
  (state) => state,
  (dispatch) => {
    return {
      fetchCollection: (Collection) => dispatch(fetchCollection(Collection)),
    };
  }
)(
  class App extends Component {
    componentDidUpdate(prevProps) {
      if (!prevProps.auth.id && this.props.auth.id) {
        this.props.fetchCollection(this.state?.Collection);
      }
    }

    render() {
      const { auth } = this.props;
      return (
        <div className="main">
          <NavBar auth={auth} />
          <Routes>
          <Route path="/items" element={<AllItems />} />
             <Route path="/items/:id" element={<SingleItem />} />
             <Route path="/login" element={<Login />} />
             <Route path="/collection" element={<Collection />} />
             <Route path="/" element={<Home />} />
             <Route path="/aboutUs" element={<AboutUs />} />
             {auth.id && (
              <Route path="/user/info" element={<UserAccountPage />} />
             )}
              {auth.isAdmin && (
                <Route path="/admin/info" element={<AdminAccountPage />} />
              )}
            {/* 
            {auth.id && (
              <Route path="/user/orders" element={<UserPrevOrders />} />
            )}
            {auth.id && (
              <Route path="/user/addresses" element={<UserAddresses />} />
            )}
            <Route path="/" element={<AllItems />} />
            
            <Route path="/success" element={<AfterCheckout />} />
            <Route path="/faq" element={<Faq />} /> */}
          </Routes>

          <Footer />
        </div>
      );
    }
  }
);

export default App;
