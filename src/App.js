import "./App.css";

import React, { Component } from "react";
import { Provider } from "react-redux";

import configureStore from "./config/configureStore";

import AuthPanel from "./components/AuthPanel";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AuthPanel />
        </div>
      </Provider>
    );
  }
}

export default App;
