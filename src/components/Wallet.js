import React, { Component } from 'react';
import '../style/Wallet.css';

class Wallet extends Component {
  // const isActive = this.props.state.currentSelectedPayment
  goTo = (e) => {
    e.preventDefault();
    this.props.goTo(e.target.name);
  }

  formatAccountName(name) {
    const accounts = {
      visa: 'Visa',
      mastercard: 'MasterCard',
      discover: 'Discover',
      amex: 'American Express'
    }
    return accounts[name];
  }

  formatAccountNumber(account) {
    return `x-${account.slice(-4)}`;
  }

  render() {
    const accounts = this.props.appState.accounts;
    const className = `wallet left${this.props.appState.actionState === 'wallet' ? ' show' : ''}`;
    return (
      <div className={ className }>
        <div className="action-title">
          <div className="close">X</div>
          <h4>Wallet</h4>
          <div className="flex-row">
            <button type="link" name="addPayment" onClick={ this.goTo }>+ Add</button>
            <button type="link" name="manageWallet" onClick={ this.goTo }>Manage ></button>
          </div>
        </div>
        {
          accounts.map((account, idx) => {
            const activeAccount = account._id === this.props.appState.currentSelectedPayment._id;
            const isActive = (activeAccount) ? ' show' : '';
            return (
              <div className="flex-row" key={ account._id }>
                <div className="card-logo bank"></div>
                <div className="account-details"> 
                  <h4 className="account-name">{ this.formatAccountName(account.accountType) }</h4>
                  <span className="small">{ this.formatAccountNumber(account.cardNumber) }</span>
                </div>
                <div className={ `checkmark${isActive} `} ></div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Wallet;