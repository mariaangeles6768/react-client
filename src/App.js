import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-car.component";
import Tutorial from "./components/car.component";
import TutorialsList from "./components/car-list.component";
import Claims from "./components/claim.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/vehicles"} className="navbar-brand">
            Vehicles
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/vehicles"} className="nav-link">
                Cars
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/claims"} className="nav-link">
                Claims
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/vehicles"} className="nav-link">
                Owners
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add 
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/vehicles"]} component={TutorialsList} />
            <Route exact path={"/claim"} component={Claims}/>
            <Route exact path="/add" component={AddTutorial} />
            <Route path="/vehicles/:id" component={Tutorial} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
