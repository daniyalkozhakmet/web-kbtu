import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { setUser } from "./redux/features/userSlice.ts";
import {
  getCartFromLocalStorage,
  getUserFromLocalStorage,
  isCartStored,
  isTokenStored,
} from "./utils/functions.ts";
import { setCart, setFromLocalStorage } from "./redux/features/productSlice.ts";
if (isTokenStored()) {
  store.dispatch(setUser(getUserFromLocalStorage()));
}
if (isCartStored()) {
  store.dispatch(setFromLocalStorage({ data: getCartFromLocalStorage() }));
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
