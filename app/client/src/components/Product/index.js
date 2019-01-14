import React, { Component } from 'react';
import PageTop from './../Shop/page_top';

import { connect } from 'react-redux';
import { getProductDetail, clearProductDetail } from './../../actions/products_actions';
import ProdNfo from './prodNfo';
import ProductImg from './prodImg';
import { addToCart } from './../../actions/user_actions';

class ProductDetail extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(getProductDetail(id)).then(response => {
            if(!this.props.products.prodDetail){
                this.props.history.push('/');
            }
        })
    }

    componentWillUnmount() {
        this.props.dispatch(clearProductDetail())
    }

    addToCartHandler(id) {
        if(!this.props.user.userData.isAuth){
            this.props.history.push('/register_login');
        } else {
            this.props.dispatch(addToCart(id))
        }
    }

    render() {
        return (
            <div>
                <PageTop 
                    title="Product detail"
                />
                <div className="container">
                    {
                        this.props.products.prodDetail ?
                            <div className="product_detail_wrapper">
                                <div className="left">
                                    <div style={{width: '500px'}}>
                                        <ProductImg 
                                            detail={this.props.products.prodDetail}
                                        />
                                    </div>
                                </div>
                                <div className="right">
                                    <ProdNfo
                                        addToCart={(id) => this.addToCartHandler(id)}
                                        detail={this.props.products.prodDetail}
                                    />
                                </div>
                            </div>
                        :null
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        user: state.user
    }
}

export default connect(mapStateToProps)(ProductDetail);
