import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import AddPayment from './AddPayment';
import CurrentPayment from './CurrentPayment';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accounts: [],
      currentSelectedPayment: 0,
      actionState: 'wallet',
    };
  }

  render() {
    return (
      <div className="app-wrapper">
        <header className="store-name">
          <h3>Toys R Us</h3>
        </header>
        <section className="content">
          <AddPayment/>
          <CurrentPayment/>
        </section> 
      </div>
    );
  }
}

export default App;
