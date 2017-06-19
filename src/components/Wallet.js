import React, { Component } from 'react';
import { formatAccountNumber, formatAccountName } from '../helpers';
import '../styles/Wallet.css';

class Wallet extends Component {
  goTo = (e) => {
    e.preventDefault();
    this.props.goTo(e.target.name);
  }

  selectPayment = (e, account) => {
    e.preventDefault();
    this.props.setCurrent(account);
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
            <button type="button" className="link small" name="addPayment" onClick={ this.goTo }>+ Add</button>
            <button type="button" className="link small" name="manageWallet" onClick={ this.goTo }>Manage ></button>
          </div>
        </div>
        <div className="accounts">
          {
            accounts.map((account, idx) => {
              const activeAccount = account._id === this.props.appState.currentSelectedPayment._id;
              const isActive = (activeAccount) ? ' show' : '';
              return (
                <div className="flex-row" key={ account._id } onClick={ (e) => this.selectPayment(e, account) }>
                  <div className={ `card-logo ${ account.accountType } `}></div>
                  <div className="account-details"> 
                    <h4 className="account-name">{ formatAccountName(account.accountType) }</h4>
                    <span className="small">{ formatAccountNumber(account.cardNumber) }</span>
                  </div>
                  <div className={ `checkmark${isActive} `} ></div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Wallet;