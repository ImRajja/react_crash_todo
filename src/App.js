import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";

import store from "./redux/store";
import { Provider } from "react-redux";

import "./App.css";
import Callback from "./components/Callback";
// import axios from "axios";
var randomstring = require("randomstring");
var __ = require("underscore");
var url = require("url");

// localStorage.setItem("authorized", false);

const isAuthorized = localStorage.getItem("authorized");
var client = {
  client_id: "globomantics-client-1",
  client_secret: "globomantics-client-secret-1",
  redirect_uris: ["http://localhost:3000/callback"],
  scope: "taskView taskAdd taskEdit taskDelete",
};
var authServer = {
  authorizationEndpoint: "http://localhost:9003/authorize",
  tokenEndpoint: "http://localhost:9003/token",
};
var buildUrl = function(base, options, hash) {
  var newUrl = url.parse(base, true);
  delete newUrl.search;
  if (!newUrl.query) {
    newUrl.query = {};
  }
  __.each(options, function(value, key, list) {
    newUrl.query[key] = value;
  });
  if (hash) {
    newUrl.hash = hash;
  }

  return url.format(newUrl);
};

function App() {
  const user = {
    result: { email: "mail2rajja@gmail.com" },
  };

  let state = null;
  useEffect(() => {
    localStorage.setItem("state", randomstring.generate());
  }, []);

  const handleClick = () => {
    localStorage.setItem("state", randomstring.generate());
    state = localStorage.getItem("state");
    console.log("state--");
    console.log(state);

    var authorizeUrl = buildUrl(authServer.authorizationEndpoint, {
      response_type: "code",
      scope: client.scope,
      client_id: client.client_id,
      redirect_uri: client.redirect_uris[0],
      state: state,
    });

    // authURL = `http://localhost:9003/authorize?response_type=code&scope=taskView%20taskAdd%20taskEdit%20taskDelete&client_id=globomantics-client-1&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=${state}`;

    window.location.href = authorizeUrl;
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            {isAuthorized ? (
              <>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <React.Fragment>
                      <AddTodo user={user} />
                      <Todos />
                    </React.Fragment>
                  )}
                />
              </>
            ) : (
              <div
                style={{
                  width: 200,
                  height: 50,
                  padding: 20,
                  borderColor: "#c3c3c3",
                  borderWidth: 5,
                  marginTop: 100,
                  marginLeft: "auto",
                  marginRight: "auto",
                  backgroundColor: "lightgreen",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={handleClick}
              >
                Login with Nilorum
              </div>
            )}
            <Route path="/about" component={About} />
            <Route path="/callback" state={state} component={Callback} />
          </div>
        </div>
      </Router>
    </Provider>
  );
  // }
}

// const mapStateToProps = (state) => {
//   return {
//     props: state.user,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);

export default App;
