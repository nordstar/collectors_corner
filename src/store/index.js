import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import item from "./item";
import collection from "./collection";
// import reviews from "./reviews";
// import userOrders from "./userOrders";
// import userAddresses from "./userAddresses";

const reducer = combineReducers({
  auth,
  item,
  collection,
  // products,
  // reviews,
  // userOrders,
  // userAddresses,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./item";
export * from "./collection";
// export * from "./reviews";
// export * from "./userOrders";
// export * from "./userAddresses";
