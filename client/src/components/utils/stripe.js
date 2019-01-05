import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const CURRENCY = 'INR';
const PAYMENT_SERVER_URL = '/api/users/fetchToken';
const STRIPE_PUBLISHABLE_KEY = 'pk_test_AQoZB271g68Cq32jeHF5InVX';

const fromEuroToINR = amount => amount * 100;

const onToken = (amount, description, transactionError, onSuccess) => token =>
  axios
    .post (PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromEuroToINR (amount),
    })
    .then (data => {
      onSuccess (data);
    })
    .catch (data => {
      transactionError (data);
    });

const Stripe = ({name, description, toPay, transactionError, onSuccess}) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromEuroToINR (toPay)}
    token={onToken (toPay, description, transactionError, onSuccess)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE_KEY}
  />
);

export default Stripe;
