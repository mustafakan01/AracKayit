import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import Home from './components/Home';
import CarList from './components/CarList';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/car-list">
          <CarList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
