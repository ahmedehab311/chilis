


import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./rtk/store.js";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <BrowserRouter>  {/* التفاف App بـ BrowserRouter */}
      <App />
    </BrowserRouter>
  </Provider>
);