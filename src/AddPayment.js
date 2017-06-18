import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class AddPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      accountType: 'visa',
      cardNumber: '',
      expiration: '',
      csc: '',
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value
    if (name === 'cardNumber') {
      // format card number
      value = value.split(' ').join('');
      if (value.length > 0) {
        value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
      }
    }
    if (name === 'expiration') {
      // format expiration date
      value = value.split('/').join('');
      if (value.length > 0) {
        value = value.match(new RegExp('.{1,2}', 'g')).join('/');
      }
    }
    console.log(value)
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    // send to the api
    // go back to Wallet view
    e.preventDefault();
    const data = this.state;
    
    fetch('/add-card', {
      method: 'POST',
      body: data,
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(json)
    })
  }

  handleCardClick = (e) => {
    if (e.target.dataset.accountType) {
      const accountType = e.target.dataset.accountType
      console.log(accountType);
      this.setState({ accountType });
    }
  }

  render() {
    return (
      <div className="left">
        <div className="action-title">
        <div className="back-arrow"></div>
          <h4>Add debit or credit card</h4>
        </div>
        <Form className="user-action" onSubmit={ this.handleSubmit } method="POST">
          <div className="flex-row">
            <FormControl type="text" name="firstName" placeholder="First name" onChange={ this.handleChange } value={ this.state.firstName }/>
            <FormControl type="text" name="lastName" placeholder="Last name" onChange={ this.handleChange } value={ this.state.lastName }/>
          </div>
          <div className="accepted-payment-methods" onClick={ this.handleCardClick }>
            <div className="card-logo visa" data-account-type="visa"></div>
            <div className="card-logo amex" data-account-type="amex"></div>
            <div className="card-logo mastercard" data-account-type="mastercard"></div>
            <div className="card-logo discover" data-account-type="discover"></div>
          </div>
          <FormGroup>
            <FormControl type="text" name="cardNumber" placeholder="1111 1111 1111 1111" maxLength="19" onChange={ this.handleChange } value={ this.state.cardNumber }/>
            <FormControl.Feedback>
              <div className={ `card-logo ${this.state.accountType}` }></div>
            </FormControl.Feedback>
          </FormGroup>
          <div className="flex-row">
            <FormGroup>
              <ControlLabel>Expires</ControlLabel>
              <FormControl type="text" name="expiration" placeholder="MM/YY" maxLength="5" onChange={ this.handleChange } value={ this.state.expiration }/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>CSC</ControlLabel>
              <FormControl type="text" name="csc" placeholder="3 digits" maxLength="3" onChange={ this.handleChange } value={ this.state.expiration }/>
              <FormControl.Feedback>
                <div className="card-logo back"></div>
              </FormControl.Feedback>
            </FormGroup>
          </div>
          <Button type="submit" bsStyle="primary" block>Add</Button>
        </Form>
      </div>
    )
  }
}

export default AddPayment;