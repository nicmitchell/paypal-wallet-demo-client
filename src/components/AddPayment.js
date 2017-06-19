import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { apiAction, prettifyAccountNumber, prettifyExpiration } from '../helpers';
import '../styles/AddPayment.css';

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
      value = prettifyAccountNumber(value);
    }
    if (name === 'expiration') {
      value = prettifyExpiration(value);
    }
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    // send to the api
    // go back to Wallet view
    e.preventDefault();
    const data = this.state;

    const options = {
      action: 'add-card',
      method: 'POST',
      body: JSON.stringify(data)
    }
    const callback = (account) => {
      this.props.addCardToState(account);
      this.props.goTo('wallet');
    }

    apiAction(options, callback);
  }

  handleCardClick = (e) => {
    if (e.target.dataset.accountType) {
      const accountType = e.target.dataset.accountType
      this.setState({ accountType });
    }
  }

  render() {
    const className = `left${this.props.appState.actionState === 'addPayment' ? ' show' : ''}`;
    return (
      <div className={ className }>
        <div className="action-title">
          <button type="button" className="link back-arrow" onClick={ (e) => this.props.goTo('wallet') }></button>
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
              <FormControl type="text" name="csc" placeholder="3 digits" maxLength="3" onChange={ this.handleChange } value={ this.state.csc }/>
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