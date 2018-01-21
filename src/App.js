import React from "react";
import { Provider } from "react-redux";

import "./App.css";

import configureStore from "./config/configureStore";

import AuthPanel from "./components/AuthPanel";

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <div className="App">
      <AuthPanel />
    </div>
  </Provider>
);

export default App;
