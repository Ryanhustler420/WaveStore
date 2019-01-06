import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
  render() {

    const onSucces = (payment) => {

        this.props.onSuccess(payment);

        // "paid": true,
        // "cancelled": false,
        // "payerID": "3GFGQ6GNJ4PWA",
        // "paymentID": "PAY-0OB74233TB278434KLMYYMVY0",
        // "paymentToken": "EC-2356DWE6597SFGBCJ56",
        // "returnUrl": "https://www.sandbox.paypal.com/?",
        // "address": {
        //      ...
        // },
        // email: "gauravgupta987@gmail.com" <- fake email for sandbox
        
        // console.log(JSON.stringify(payment));
    }

    const onCancel = (data) => {
        this.props.transactionCancled(data);
        // console.log(JSON.stringify(data));
    }

    const onError = (err) => {
        console.log(JSON.stringify(err));
    }

    let env = 'sandbox';
    let currency ='USD'
    let total = this.props.toPay

    const client = {
        sandbox: 'Acj452d4K2JdL5wo1XC5hWRgo7GxHHXU8wC0ioB_V2unhvln0miFi-v19ljzUIYf2lRdVk4paoEHBckY',
        production: ''
    }

    return (
      <div>
        <PaypalExpressBtn 
            env={env}
            client={client}
            currency={currency}
            total={total}
            onError={onError}
            onSucces={onSucces}
            onCancel={onCancel}
            style={{
                size:'large',
                color: 'blue',
                shape: 'rect',
                label: 'checkout'
            }}
        />
      </div>
    )
  }
}

export default Paypal;
