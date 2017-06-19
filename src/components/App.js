import React, { Component } from 'react';
import AddPayment from './AddPayment';
import ManageWallet from './ManageWallet';
import Wallet from './Wallet';
import CurrentPayment from './CurrentPayment';
import '../style/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accounts: [],
      currentSelectedPayment: {},
      actionState: 'wallet',
    };
  }

  componentDidMount() {
    this.fetchAccounts();
  }

  fetchAccounts() {
    return fetch('/api/fetch-accounts', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(this.checkStatus)
    .then(this.parseJSON)
    .then((accounts) => {
      console.log('Fetching accounts', accounts)
      this.setState({ 
        currentSelectedPayment: accounts[0],
        accounts
      })
    });
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.status = response.statusText;
    error.response = response;
    throw Error(error);
  }

  parseJSON(response) {
    return response.json();
  }

  goTo = (view) => {
    this.setState({ actionState: view });
  }

  render() {
    return (
      <div className="app-wrapper">
        <header className="store-name">
          <h3>Toys R Us</h3>
        </header>
        <section className="content">
          <AddPayment appState={ this.state } goTo={ this.goTo }/>
          <ManageWallet appState={ this.state } goTo={ this.goTo }/>
          <Wallet appState={ this.state} goTo={ this.goTo }/>
          <CurrentPayment account={ this.state.currentSelectedPayment } goTo={ this.goTo }/>
        </section> 
      </div>
    );
  }
}

export default App;
