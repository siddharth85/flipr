import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";

import AuthState from "./context/auth/AuthState";

import "./App.css";

const App = () => {
  return (
    <AuthState>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </AuthState>
  );
};

export default App;
