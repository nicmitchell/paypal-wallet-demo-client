import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class CurrentPayment extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="summary disabled right">
        <header className="flex-row">
          <div className="logo"></div>
          <div className="checkout-total"><div className="cart-icon"></div>$26.99 USD</div>
        </header>
        <hr />
        <section>
          <div className="salutation">Hi, Michael! <a href="#">Not you?</a></div>
          <div className="flex-row">
            <h4>Pay with</h4><div className="change-method"><a href="#">Change ></a></div>
          </div>
          <div className="flex-row">
            <h5 className="payment-selected"><div className="card-logo bank"></div>CITIBANK FSB x-1234</h5>
            <h5 className="checkout-total">$26.99</h5>
          </div>
        </section>
      </div>
    )
  }
}

export default CurrentPayment;