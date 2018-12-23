import React, { Component } from 'react'
import HomeSlider from './home_slider';
import HomePromotions from './home_promotion';
import { connect } from 'react-redux';
import { getProductsBySell, getProductsByArrival } from '../../actions/products_actions';
import CardBlock from './../utils/card_block';

class Home extends Component {

    componentDidMount() {
        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());
    }

    render() {
        return (
            <div>
                <HomeSlider />
                <CardBlock 
                    list={this.props.products.bySell}
                    title="Best Selling Guitars"
                />
                <HomePromotions />
                <CardBlock 
                    list={this.props.products.byArrival}
                    title="New Arrival"
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Home);
