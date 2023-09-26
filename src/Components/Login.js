import React, { Component } from "react";
import { attemptLogin } from "../store/auth";
import { connect } from "react-redux";
import Register from "./Register";
import { createBrowserHistory } from "history";
let history = createBrowserHistory();

const Login = connect(
  (state) => ({
    isAdmin: state.auth.isAdmin,
    collection: state.collection,
  }),
  (dispatch) => {
    return {
      attemptLogin: (credentials) => dispatch(attemptLogin(credentials)),
    };
  }
)(
  class Login extends Component {
    constructor() {
      super();
      this.state = {
        credentials: {
          username: "",
          password: "",
          error: "",
        },
      };
      this.onChange = this.onChange.bind(this);
      this.login = this.login.bind(this);
    }
    onChange(ev) {
      this.setState({
        credentials: {
          ...this.state.credentials,
          [ev.target.name]: ev.target.value,
        },
      });
    }
    login = async (ev) => {
      ev.preventDefault();
      this.props
        .attemptLogin(this.state.credentials, this.state.collection)
        .then(() => history.back())
        .catch(() => window.alert("incorrect username or password"));
    };

    render() {
      const { credentials } = this.state;
      const { onChange } = this;
      const { login } = this;

      return (
        <div id="login-form">
          <div>
            <h2 className="form-headings">Login</h2>
            <form onSubmit={login}>
              <input
                placeholder="username"
                value={credentials.username}
                name="username"
                onChange={onChange}
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
              />
              <button>Login</button>
            </form>
          </div>
          <hr />
          <div id="register-form">
            <Register />
          </div>
        </div>
      );
    }
  }
);

export default Login;
