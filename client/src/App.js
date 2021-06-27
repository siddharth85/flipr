import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
import Dashboard from "./components/user/Dashboard";
import ImportContacts from "./components/user/ImportContacts";
import ViewContacts from "./components/user/ViewContacts";
import CreateAgenda from "./components/user/CreateAgenda";

import "./App.css";

import AuthState from "./context/auth/AuthState";

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
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/import" component={ImportContacts} />
              <PrivateRoute exact path="/view" component={ViewContacts} />
              <PrivateRoute exact path="/newAgenda" component={CreateAgenda} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </AuthState>
  );
};

export default App;
