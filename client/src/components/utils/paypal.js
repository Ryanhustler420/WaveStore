import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
  render() {

    const onSucces = (payment) => {
        console.log(JSON.stringify(payment));
    }

    const onCancel = (data) => {
        console.log(JSON.stringify(data));
    }

    const onError = (err) => {
        console.log(JSON.stringify(err));
    }

    let env = 'sandbox';
    let currency ='INR'
    let total = this.props.toPay

    const client = {
        sandbox: 'AZspzRh63Jdr8glBwlbj-f3pXJ54AVW0diI05z5v7TUV-XSxn_DNLhmoi2-8altwWp_khKjCQkpv7-LD',
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
