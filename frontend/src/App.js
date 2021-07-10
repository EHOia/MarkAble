import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Create from './components/Create';

class App extends Component {
  render() { 
    return (
      <Router>
        <div className="container">
        <p stype="text-align:center;">
          <h1>Welcome to Trademark Verification!</h1>
        </p>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><Link to={'/create'} className="nav-link">시작하기</Link></li>
          </ul>
          <hr />
        <p stype="text-align:center;">
          <Route exact path='/create' component={ Create } />
        </p>
        </div>
      </Router>
    );
  }
}

export default App;
