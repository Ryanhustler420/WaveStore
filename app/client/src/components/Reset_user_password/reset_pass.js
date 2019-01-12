import React, {Component} from 'react';
import axios from 'axios';

import {update, generateData, isFormValid} from '../utils/Form/formsAction';
import FormField from './../utils/Form/FormField';

export default class ResetUser extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'text',
          placeholder: 'Enter your email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  };

  submitForm = event => {
    event.preventDefault ();

    let dataToSubmit = generateData (this.state.formdata, 'reset_email');
    let formIsValid = isFormValid (this.state.formdata, 'reset_email');

    if (formIsValid) {
      console.log (dataToSubmit);
    } else {
      this.setState ({
        formError: true,
      });
    }
  };

  updateForm = element => {
    const newFormdata = update (element, this.state.formdata, 'reset_email');
    this.setState ({
      formError: false,
      formdata: newFormdata,
    });
  };

  render () {
    return (
      <div className="container">
        <h1>Reset password</h1>
        <form onSubmit={event => this.submitForm (event)}>
          <FormField
            id={'email'}
            formdata={this.state.formdata.email}
            change={element => this.updateForm (element)}
          />
          <div>
            {this.state.formSuccess
              ? <div className="form_success">
                  Done, Check your email
                </div>
              : null
            }
            <button
              type="submit"
              tabIndex="-1"
              onClick={event => this.submitForm (event)}
            >
              Send Password Reset
            </button>
          </div>
        </form>
      </div>
    );
  }
}
