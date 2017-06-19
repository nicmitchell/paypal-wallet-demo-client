import React, { Component } from 'react';
import AddPayment from './AddPayment';
import ManageWallet from './ManageWallet';
import Wallet from './Wallet';
import CurrentPayment from './CurrentPayment';
import { apiAction } from '../helpers';
import '../styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accounts: [],
      currentSelectedPayment: {},
      actionState: 'manageWallet',
    };
  }

  componentDidMount() {
    const options = {
      action: 'fetch-accounts',
      method: 'GET',
    }
    const callback = (accounts) => {
      this.setState({ 
        currentSelectedPayment: accounts[0],
        accounts
      });
    }
    apiAction(options, callback);
  }

  goTo = (view) => {
    this.setState({ actionState: view });
  }

  setCurrent = (currentSelectedPayment) => {
    this.setState({ currentSelectedPayment });
  }

  addCardToState = (account) => {
    const accounts = this.state.accounts;
    accounts.push(account);
    this.setState({ accounts });
  }

  removeCardFromState = (account) => {
    const oldAccounts = this.state.accounts;
    const current = this.state.currentSelectedPayment
    const accounts = oldAccounts.reduce((prev, current) => {
      if (current._id === account.id) {
        return prev;
      } else {
        return prev.concat(current);
      }
    }, []);

    if (account.id === current._id) {
      this.setCurrent(accounts[0]);
    }

    this.setState({ accounts });
  }

  render() {
    return (
      <div className="app-wrapper">
        <header className="store-name">
          <h3>Toys R Us</h3>
        </header>
        <section className="content">
          <AddPayment appState={ this.state } goTo={ this.goTo } addCardToState={ this.addCardToState }/>
          <ManageWallet appState={ this.state } goTo={ this.goTo } removeCardFromState={ this.removeCardFromState }/>
          <Wallet appState={ this.state} goTo={ this.goTo } setCurrent={ this.setCurrent }/>
          <CurrentPayment account={ this.state.currentSelectedPayment } goTo={ this.goTo }/>
        </section> 
      </div>
    );
  }
}

export default App;
