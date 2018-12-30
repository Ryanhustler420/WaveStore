import React, { Component } from 'react';
import SideNav from './../../HOC/sideNav';
import { connect } from 'react-redux';

import { getCartItems } from './../../actions/user_actions';
import UserProductBlock from './../utils/User/product_block';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';

class UserCart extends Component {

    state = {
        loading: true,
        total: 0,
        showTotal: false,
        showSuccess: false
    }


    componentDidMount() {
        let cartItems = [];
        let user = this.props.user;

        if(user.userData.cart){
            if(user.userData.cart.length > 0){
                user.userData.cart.forEach(item => {
                    cartItems.push(item.id);
                });
                this.props.dispatch(getCartItems(cartItems, user.userData.cart))
                    .then(() => {
                        if(this.props.user.cartDetail.length > 0){
                            this.calculateTotal(this.props.user.cartDetail);
                        }
                    })
            }
        }
    }

    calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.forEach(item => {
            total += parseInt(item.price,10) * item.quantity;
        });

        this.setState({
            total,
            showTotal: true
        })
    }


    removeFromCart = (id) => {

    }

    showNoItemMessage = () => (
        <div className="cart_no_items">
            <FontAwesomeIcon 
                icon={faFrown}
            />
            You have no items
        </div>
    )

    render() {
        return (
            <SideNav>
                <div>
                    <h1>My cart</h1>
                    <div className="user_cart">
                        <UserProductBlock 
                            products={this.props.user}
                            type="cart"
                            removeItem={(id) => this.removeFromCart(id)}
                        />
                        {
                            this.state.showTotal ?
                                <div className="user_cart_sum">
                                    <div>
                                        Total amount: $ {this.state.total}
                                    </div>
                                </div>
                            :
                                this.state.showSuccess ?
                                    <div className="cart_success">
                                        <FontAwesomeIcon icon={faSmile} />
                                        <div>
                                            Thank you for making purchase with us.
                                        </div>
                                    </div>
                                :
                                this.showNoItemMessage()
                        }
                    </div>
                    {
                        this.state.showTotal ? 
                                <div className="paypal_button_container">
                                    Pay With Paypal
                                </div>
                            : null
                    }
                </div>
            </SideNav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserCart);