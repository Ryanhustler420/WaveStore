import React, { Component } from 'react';
import SideNav from './../../HOC/sideNav';
import { connect } from 'react-redux';

import { getCartItems } from './../../actions/user_actions';

// import FontAwesomeIcon from '@fontawesome/react-fontawesome';
// import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
// import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';

class UserCart extends Component {

    state = {
        loading: true,
        total: 0,
        showTotal: false,
        showSuccess: false
    }


    componentDidMount() {
        let cartItem = [];
        let user = this.props.user;

        if(user.userData.cart){
            if(user.userData.cart.length > 0){
                user.userData.cart.forEach(item => {
                    cartItem.push(item.id);
                });
                this.props.dispatch(getCartItems(cartItem, user.userData.cart));
            }
        }
    }

    render() {
        return (
            <SideNav>
                <div>
                    cart
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