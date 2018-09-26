import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './views/LandedCostCalc'
import './App.css';
import IndexRoute from './routes/index';
import Header from "./views/NavBar/Header";

class App extends Component {
      render() {
    return (
      <div className="App">
          <Header/>
          <Switch>
              <Route exact path="/" component={Home}  />
              {IndexRoute.map((prop, key) => {
                  return <Route exact path={prop.path} key={key} component={prop.component} />;
              })}
          </Switch>
      </div>
    );
  }
}

export default App;
