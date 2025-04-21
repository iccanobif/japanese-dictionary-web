import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "./redux/reducer";
import thunkMiddleware from "redux-thunk";
//import { createLogger } from "redux-logger";

const middlewares = [
  thunkMiddleware, 
  // createLogger(),
];

export const store = createStore(reducer, applyMiddleware(...middlewares));

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Provider store={store}>
  <App />
</Provider>)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
