import React, { Component } from 'react';
import FormField from './../utils/Form/FormField';
import { update, generateData, isFormValid, errorChecker, clearFormPassword } from '../utils/Form/formsAction';
import { Dialog } from '@material-ui/core';

import { connect } from 'react-redux';
import { RegisterUser } from '../../actions/user_actions';


class Register extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Enter your lastname'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'text',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
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

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'register');
        let formIsValid = isFormValid(this.state.formdata, 'register');
        dataToSubmit = { ...dataToSubmit, email: dataToSubmit.email.toLowerCase() }
        if(formIsValid){
            this.props.dispatch(RegisterUser(dataToSubmit))
                .then(response => {
                    if(response.payload.success){
                        // login successfully
                        this.setState({
                            formError: false,
                            formSuccess: true
                        });
                        setTimeout(() => {
                            this.props.history.push('/register_login');
                        },3000);
                    } else {
                        // Login fails
                        const errorMsg = errorChecker(response.payload.error.message);
                        const newFormData = clearFormPassword(this.state.formdata, ['password', 'confirmPassword'])
                        this.setState({
                            formError: true,
                            validationMessage: errorMsg,
                            formdata: newFormData
                        });
                    }
                }).catch(e => {
                    this.setState({
                        formError: true
                    })
                });
        } else {
            this.setState({
                formError: true
            })
        }
    }

    updateForm = (element) => {
        // it send state snapshot to function 'update()' and modify that 
        // than return backs the copy and here we set the state with that data
        const newFormdata = update(element, this.state.formdata, 'register');
        this.setState({
            formError: false, 
            formdata: newFormdata
        });
    }

    render() {
        return (
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login_container">
                        <div className="left">
                            <form onSubmit={(event) => this.submitForm(event)}>
                                <h2>Personal Information</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormField 
                                            id={'name'}
                                            formdata={this.state.formdata.name}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="block">
                                        <FormField 
                                            id={'lastname'}
                                            formdata={this.state.formdata.lastname}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <FormField 
                                        id={'email'}
                                        formdata={this.state.formdata.email}
                                        change={(element) => this.updateForm(element)}
                                    />
                                </div>
                                <h2>Verify password</h2>
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
                                                {this.state.validationMessage}
                                            </div>
                                        :null
                                    }
                                    <button type="submit" tabIndex="-1" onClick={(event) => this.submitForm(event)}>
                                        Create an Account
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Dialog open={this.state.formSuccess}>
                    <div className="dialog_alert">
                        <div style={{textAlign: 'center'}}>Congratulations!!!</div>
                        <div>
                            You will be redirected to the LOGIN page in a couple second... 
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default connect()(Register);