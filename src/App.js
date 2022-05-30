import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";

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

  componentDidMount() {
    fetchItems(this.user).then((res) => this.setState({ todos: res.data }));
  }

  // Toggle Complete
  markComplete = (_id) => {
    var markedTodo = this.state.todos.filter(function(todo) {
      return todo._id === _id;
    });

    updateItem(_id, { completed: !markedTodo[0].completed }, this.user).then(
      (res) => {
        this.setState({
          todos: this.state.todos.map((todo) => {
            if (todo._id === _id) {
              todo.completed = !todo.completed;
            }
            return todo;
          }),
        });
      }
    );
  };

  // Delete Todo
  delTodo = (_id) => {
    deleteItem(_id, this.user).then((res) => {
      console.log(`Im here///`);
      console.log(res);
      this.setState({
        todos: [...this.state.todos.filter((todo) => todo._id !== _id)],
      });
    });
  };

  // Add Todo
  addTodo = (title) => {
    createItem({ title }, this.user).then((res) => {
      this.setState({
        todos: [...this.state.todos, { _id: res.data.insertedId, title }],
      });
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
