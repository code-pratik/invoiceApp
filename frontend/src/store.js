import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import productsReducer from "./pages/productPage/productSlice";
import jobReducer from "./pages/jobPage/jobSlice";
import invoicesReducer from "./pages/invoicepage/invoiceSlice";
import darkModeReducer from "./components/DarkMode/darkSlice";
const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  productsData: productsReducer,
  jobsData: jobReducer,
  invoicesData: invoicesReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["darkMode"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
