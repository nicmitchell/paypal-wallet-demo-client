import React, { Component } from 'react';
import { accountNumberObfuscate, accountNameCase } from '../helpers';
import '../styles/CurrentPayment.css';

class CurrentPayment extends Component {
  awkward = (e) => {
    window.alert('Well, this just got awkward ...');
  }
  
  render() {
    const { firstName='', accountType='', cardNumber='' } = this.props.account;
    return (
      <div className="summary disabled right">
        <header className="flex-row">
          <div className="logo"></div>
          <div className="checkout-total"><div className="cart-icon"></div>$26.99 USD</div>
        </header>
        <hr />
        <section>
          <div className="salutation">Hi, { firstName }!<button type="button" className="link" onClick={ this.awkward }>Not you?</button></div>
          <div className="flex-row">
            <h4>Pay with</h4>
            <button type="button" className="link smaller" onClick={ (e) => this.props.goTo('wallet') }>Change ></button>
          </div>
          <div className="flex-row payment-selected">
            <div className={ `card-logo ${accountType}` }></div>
            <h5 className="account-name">{ accountNameCase(accountType) } { accountNumberObfuscate(cardNumber) }</h5>
            <h5 className="checkout-total">$26.99</h5>
          </div>
        </section>
      </div>
    )
  }
}

export default CurrentPayment;