import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";

import store from "./redux/store";
import { Provider } from "react-redux";

import { createItem, fetchItems, deleteItem, updateItem } from "./API/api";

import "./App.css";

class App extends Component {
  user = {
    result: {
      email: "mail2rajja@gmail.com",
    },
  };

  state = {
    todos: [],
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="container">
              <Header />
              <Route
                exact
                path="/"
                render={(props) => (
                  <React.Fragment>
                    <AddTodo user={this.user} />
                    <Todos />
                  </React.Fragment>
                )}
              />
              <Route path="/about" component={About} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
