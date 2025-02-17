import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import storeRedux from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import "./styles/GlobalStyles.scss";
createRoot(document.getElementById("root")).render(
    <Provider store={storeRedux}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
