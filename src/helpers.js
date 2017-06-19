export const accountNumberObfuscate = (account) => {
  return `x-${account.slice(-4)}`;
};

export const accountNameCase = (name) => {
  const accounts = {
    visa: 'Visa',
    mastercard: 'MasterCard',
    discover: 'Discover',
    amex: 'American Express',
    bank: 'Bank Account'
  }
  return accounts[name];
};

export const prettifyAccountNumber = (number) => {
  number = number.split(' ').join('');
  if (number.length > 0) {
    number = number.match(new RegExp('.{1,4}', 'g')).join(' ');
  }
  return number;
}

export const prettifyExpiration = (number) => {
  number = number.split('/').join('');
  if (number.length > 0) {
    number = number.match(new RegExp('.{1,2}', 'g')).join('/');
  }
  return number;
}

export const apiAction = (options, callback) => {
  const { action, method, body } = options;
  return fetch(`/api/${action}`, {
    method: method,
    body: body,
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