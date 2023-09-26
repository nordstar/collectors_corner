import React, { Component } from "react";
import { registerUser } from "../store";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
let history = createBrowserHistory();

const Register = connect(
  (state) => state,
  (dispatch) => {
    return {
      registerUser: (credentials, collection) => dispatch(registerUser(credentials, collection)),
    };
  }
)(
  class Register extends Component {
    constructor() {
      super();
      this.state = {
        credentials: {
          username: "",
          email: "",
          password: "",
        },
      };
      this.onChange = this.onChange.bind(this);
      this.register = this.register.bind(this);
    }
    onChange(ev) {
      this.setState({
        credentials: {
          ...this.state.credentials,
          [ev.target.name]: ev.target.value,
        },
      });
    }
    register(ev) {
      ev.preventDefault();
      this.props.registerUser(this.state.credentials, this.props.cart);
      history.back();
    }
    render() {
      const { credentials } = this.state;
      const { onChange } = this;
      const { register } = this;
      return (
        <div>
          <h2 className="form-headings">or Sign Up</h2>
          <form onSubmit={register}>
            <input
              placeholder="username"
              value={credentials.username}
              name="username"
              onChange={onChange}
            />
            <input
              placeholder="email"
              value={credentials.email}
              name="email"
              onChange={onChange}
            />
            <input
              placeholder="password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
            <button>Sign Up</button>
          </form>
        </div>
      );
    }
  }
);

export default Register;
