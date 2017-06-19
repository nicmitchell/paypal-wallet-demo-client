export const formatAccountNumber = (account) => {
  return `x-${account.slice(-4)}`;
};

export const formatAccountName = (name) => {
  const accounts = {
    visa: 'Visa',
    mastercard: 'MasterCard',
    discover: 'Discover',
    amex: 'American Express',
    bank: 'Bank Account'
  }
  return accounts[name];
};

export const apiAction = (options, callback) => {
  const { action, method, data } = options;
  return fetch(`/api/${action}`, {
    method: method,
    body: data,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(checkStatus)
  .then(parseJSON)
  .then(callback);
};

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.status = response.statusText;
  error.response = response;
  throw Error(error);
};

export const parseJSON = (response) => {
  return response.json();
};