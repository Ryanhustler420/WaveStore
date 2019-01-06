import React from 'react'
import MyButton from './../utils/button';
import Login from './login';

const RegisterLogin = () => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>New Customer</h1>
                        <p>
                            Sunt anim et reprehenderit consectetur exercitation elit culpa exercitation irure pariatur minim. Lorem ad do consectetur excepteur ad Lorem.
                        </p>
                        <MyButton 
                            type="default"
                            title="Create an account"
                            linkTo="/register"
                            addStyle={{
                                margin:'10px 0 0 0'                                
                            }}
                        />
                    </div>
                    <div className="right">
                        <h2>Registered customer</h2>
                        <p>If you have an account please log in</p>
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterLogin;
