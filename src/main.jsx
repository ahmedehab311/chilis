// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import "react-toastify/dist/ReactToastify.css";
// import { Provider } from "react-redux";
// import store from "./rtk/store.js";
// import { BrowserRouter } from "react-router-dom";
// import { Profiler } from "react";

// // eslint-disable-next-line no-unused-vars
// const onRender = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
//   // console.log({
//   //   id,
//   //   phase,
//   //   actualDuration,
//   //   baseDuration,
//   //   startTime,
//   //   commitTime,
//   //   interactions
//   // });
// };

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <Profiler id="App" onRender={onRender}>
//         <App />
//       </Profiler>
//     </BrowserRouter>
//   </Provider>
// );

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./rtk/store.js";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Profiler } from "react";

const queryClient = new QueryClient();

const onRender = () => {};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      {/* إضافة QueryClientProvider */}
      <QueryClientProvider client={queryClient}>
        <Profiler id="App" onRender={onRender}>
          <App />
        </Profiler>
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>
);
