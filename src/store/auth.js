import axios from "axios";
import collection from "./collection";

export const logout = () => {
  window.localStorage.removeItem("token");
  return { type: "SET_AUTH", auth: {} };
};

export const loginWithToken = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "SET_AUTH", auth: response.data });
    }
  };
};

//adds token to user and local storage and calls login action creator
export const attemptLogin = (credentials, collection) => {
  console.log("collection", collection);
  return async (dispatch) => {
    const response = await axios.post("/api/auth/login", credentials);

    window.localStorage.setItem("token", response.data);
    dispatch(loginWithToken());
  };
};

//registers new user
export const registerUser = (credentials, collection) => {
  return async (dispatch) => {
    const response = await axios.post("/api/auth/register", credentials);
    if (collection) {
      collection.lineItems.map(async (element) => {
        await axios.post("/api/orders/collection", element, {
          headers: {
            authorization: response.data,
          },
        });
      });
    }
    window.localStorage.setItem("token", response.data);
    dispatch(loginWithToken());
  };
};

//updates user info
export const updateUserInfo = (user) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.put(`/api/auth/${user.id}`, user, {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "UPDATE_USER", auth: response.data });
    }
  };
};

const auth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    return action.auth;
  }
  if (action.type === "UPDATE_USER") {
    return action.auth;
  }
  if (action.type === "GET_USER") {
    return action.auth;
  }
  return state;
};

export default auth;
