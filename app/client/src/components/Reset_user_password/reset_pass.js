import React, { Component } from 'react';
import axios from 'axios';

import {update, generateData, isFormValid} from '../utils/Form/formsAction';
import FormField from './../utils/Form/FormField';
import Dialog  from '@material-ui/core/Dialog';

export default class ResetPass extends Component {

  state = {
    resetToken: '',
    formError: false,
    formErrorMessage: '',
    formSuccess: '',
    formdata: {
      password: {
        element: 'input',
        value: '',
        config: {
            name: 'password_input',
            type: 'password',
            placeholder: 'Enter your password'
        },
        validation: {
            required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
    },
    confirmPassword: {
        element: 'input',
        value: '',
        config: {
            name: 'confirm_password_input',
            type: 'password',
            placeholder: 'Confirm your password'
        },
        validation: {
            required: true,
            confirm: 'password'
        },
        valid: false,
        touched: false,
        validationMessage: ''
    }
    }
  }

  componentDidMount() {
    const resetToken = this.props.match.params.token;
    this.setState({resetToken})
  }

  submitForm = event => {
    event.preventDefault ();

    let dataToSubmit = generateData (this.state.formdata, 'reset_pass');
    let formIsValid = isFormValid (this.state.formdata, 'reset_pass');

    if (formIsValid) {
      axios.post('/api/users/reset_password', {
        ...dataToSubmit,
        resetToken: this.state.resetToken
      }).then(response => {
        if(!response.data.success) {
          this.setState({
            formError: true,
            formErrorMessage: response.data.message
          })
        } else {
          this.setState({formError: false, formSuccess: true});
          setTimeout(() => {
            this.props.history.push('/register_login');
          }, 3000)
        }
      })

    } else {
      this.setState ({
        formError: true,
      });
    }
  };

  updateForm = element => {
    const newFormdata = update (element, this.state.formdata, 'reset_pass');
    this.setState ({
      formError: false,
      formdata: newFormdata,
    });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={(event) => this.submitForm(event)}>
          <h2>Reset Password</h2>
          <div className="form_block_two">
              <div className="block">
                  <FormField 
                      id={'password'}
                      formdata={this.state.formdata.password}
                      change={(element) => this.updateForm(element)}
                  />
              </div>
              <div className="block">
                  <FormField 
                      id={'confirmPassword'}
                      formdata={this.state.formdata.confirmPassword}
                      change={(element) => this.updateForm(element)}
                  />
              </div>
          </div>
          <div>
              {
                  this.state.formError ?
                      <div className="error_label">
                          {this.state.formErrorMessage}
                      </div>
                  :null
              }
              <button type="submit" tabIndex="-1" onClick={(event) => this.submitForm(event)}>
                  Reset Password
              </button>
          </div>
        </form>
        <Dialog open={this.state.formSuccess}>
            <div className="dialog_alert">
                <div style={{textAlign: 'center'}}>Alright !!</div>
                <div>
                    Your password was reseted... please wait
                </div>
            </div>
        </Dialog>
      </div>
    )
  }
}
