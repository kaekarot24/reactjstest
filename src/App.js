import React, { Component } from "react";
import "./App.css";
import Signup from "./components/SignUp/Signup";
import Signin from "./components/SignIn/Signin";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    const login = localStorage.getItem("isLoggedIn");

    return (
      <div className="App">
        {login ? (
          <Router>
            <Route exact path="/" component={Signup}></Route>
            <Route path="/sign-in" component={Signin}></Route>
            <Route path="/home" component={Home}></Route>
          </Router>
        ) : (
          <Router>
            <Route exact path="/" component={Signup}></Route>
            <Route path="/sign-in" component={Signin}></Route>
            <Route path="/home" component={Home}></Route>
          </Router>
        )}
      </div>
    );
  }
}
