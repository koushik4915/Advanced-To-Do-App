import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import loginSlice from './assets/LoginSlice.jsx'
import userSlice from './assets/UserSlice.jsx'


const store = configureStore({
  reducer:{
    Login:loginSlice,
    user: userSlice
  }
})

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
