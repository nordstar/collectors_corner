import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState();

  const handleChange = (ev) => {
    setEmail(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setEmail("");
  };
  return (
    <div id="footer">
      <div id="footer-container">
        <ul id="about-section">
          <li>Contact Us</li>
          <li>Email: alan@alan.com</li>
          <li>1111 Milwaukee Ave</li>
          <li>Chicago, IL 60642</li>
        </ul>
        {/* <ul id="faq-section">
          <Link className="hashLink" to="/faq">
            <li>Returns & Exchanges</li>
            <li>Price Match Guarantee</li>
            <li>Product Recalls</li>
          </Link>
        </ul> */}
        <form className="footer_form">
          <label className="label">
            Sign up to receive our newsletter!
          </label>
          <input
            name="email"
            value={email}
            placeholder="email"
            onChange={handleChange}
          />
          <button onClick={handleSubmit} className="footer-button">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Footer;
