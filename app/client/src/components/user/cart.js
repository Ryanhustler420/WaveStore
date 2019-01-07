import React, { Component } from 'react';
import SideNav from './../../HOC/sideNav';
import { connect } from 'react-redux';

import { getCartItems, removeCartItem, onSuccessBuy } from './../../actions/user_actions';
import UserProductBlock from './../utils/User/product_block';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';
import Stripe from './../utils/stripe';

class UserCart extends Component {
// AZspzRh63Jdr8glBwlbj-f3pXJ54AVW0diI05z5v7TUV-XSxn_DNLhmoi2-8altwWp_khKjCQkpv7-LD
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
        this.props.dispatch(removeCartItem(id))
            .then(() => {
                if(this.props.user.cartDetail.length <= 0){
                    this.setState({showTotal: false})
                } else {
                    this.calculateTotal(this.props.user.cartDetail)
                }
            })
    }

    showNoItemMessage = () => (
        <div className="cart_no_items">
            <div>
                <FontAwesomeIcon 
                    icon={faFrown}
                />
            </div>
            You have no items
        </div>
    )

    transactionError = (dataFromStripe) => {
        console.log(dataFromStripe,'error');
    }

    createPaymentObject(payment) {
        let paymentData = {};
        ['amount','balance_transaction','created','currency','id','paid','status'].map(key => {
            let Key = key;
            let value = payment.data.success[key];
            if(key === 'amount'){
                value = value.toString().slice(0, value.toString().length - 2)
            }
            if(Key === 'id'){
                Key = 'paymentId'
            }
            paymentData = {
                ...paymentData,
                [Key]: value
            }
            return paymentData;
        })
        return paymentData;
    }

    transactionSuccess = (dataFromStripe) => {
        const paymentInformation = this.createPaymentObject(dataFromStripe);
        // console.log(paymentInformation);
        this.props.dispatch(onSuccessBuy({
            cartDetail: this.props.user.cartDetail,
            paymentData: {
                paymentData: paymentInformation                
             }
        })).then(() => {
            if(this.props.user.successBuy){
                this.setState({
                    showTotal: false,
                    showSuccess: true
                })
            }
        })
    }

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
                                <Stripe
                                    name={'One more step to go'}
                                    description={'Only The Guitars'} 
                                    toPay={this.state.total}
                                    transactionError={(dataFromStripe) => this.transactionError(dataFromStripe)}
                                    onSuccess={(dataFromStripe) => this.transactionSuccess(dataFromStripe)}
                                />
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