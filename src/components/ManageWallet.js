import React, { Component } from 'react';
import { accountNumberObfuscate, accountNameCase, apiAction } from '../helpers';
import '../styles/ManageWallet.css';

class ManageWallet extends Component {
  updateAccount = (e) => {
    e.preventDefault();
    window.alert(`I can't let you do that Dave...`);
  }

  deleteAccount = (e, account) => {
    e.preventDefault();
    const confirmed = window.confirm(`This will permanently remove this card. Are you sure you would like to proceed?`);
    if (confirmed) {
      const options = {
        action: 'delete-card',
        method: 'POST',
        body: JSON.stringify(account)
      }
      const callback = (account) => {
        this.props.removeCardFromState(account);
      }
      apiAction(options, callback);
    }
  }

  render() {
    const accounts = this.props.appState.accounts;
    const className = `wallet left${this.props.appState.actionState === 'manageWallet' ? ' show' : ''}`;
    return (
      <div className={ className }>
        <div className="action-title">
          <button type="button" className="link back-arrow" onClick={ (e) => this.props.goTo('wallet') }></button>
          <h4>Manage Wallet</h4>
        </div>
        <div className="accounts">
          {
            accounts.map((account, idx) => {
              return (
                <div className="flex-row" key={ account._id }>
                  <div className={ `card-logo ${ account.accountType } `}></div>
                  <div className="account-details"> 
                    <h4 className="account-name">{ accountNameCase(account.accountType) }</h4>
                    <span className="small">{ accountNumberObfuscate(account.cardNumber) }</span>
                  </div>
                  <div className="manage-actions">
                    <button type="button" className="link smaller" onClick={ (e) => this.updateAccount(e, account) }>Update</button>
                    <button type="button" className="link smaller" onClick={ (e) => this.deleteAccount(e, account) }>Delete</button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default ManageWallet;