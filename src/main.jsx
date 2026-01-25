import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/index";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/index.css"; 
import "./styles/modal.css"; 
// import App2 from "./App2";
import Apps from "./Apps.jsx"; 
// import { ApiProvider } from "@reduxjs/toolkit/query/react";

// console.log(import.meta.env.MODE)
// console.log(import.meta.env.BASE_URL)
// console.log(import.meta.env.VITE_SOMETHING)
// import { apiSlice } from './features/api/apiSlice';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}> 
    <Apps />  
    </Provider>
  </React.StrictMode>
);
