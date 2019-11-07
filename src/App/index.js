import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link
} from 'react-router-dom';

import Main from '../pages/Main';
import Edit from '../pages/Edit';

export default () => (
  <Router>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Inventory
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" exact activeClassName="active" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/edit">
              Edit
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
    <div className="container-fluid">
      <Switch>
        <Route path="/edit">
          <Edit />
        </Route>
        <Route exact path="/">
          <Main />
        </Route>
      </Switch>
    </div>
  </Router>
);
