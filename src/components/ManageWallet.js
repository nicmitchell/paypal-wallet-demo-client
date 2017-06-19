import React, { Component } from 'react';
import { formatAccountNumber, formatAccountName } from '../helpers';
import '../styles/ManageWallet.css';

class ManageWallet extends Component {
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

export default ManageWallet;