import { createStore } from "redux";
import rootReducer from "../reducer/rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Cấu hình redux-persist
const persistConfig = {
    key: "root",
    storage, // Lưu vào localStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };
