import React, { Component } from 'react';
import PageTop from './page_top';


import { connect } from 'react-redux';
import { getBrands, getWoods, getProductToShop } from './../../actions/products_actions';
import CollapseCheckbox from './../utils/collapseCheckbox';
import { frets, price } from './../utils/Form/fixed_categories';
import CollapseRadio from './../utils/collapseRadio';

class Shop extends Component {

    state = {
        grid: '',
        limit: 6,
        skip: 0,
        filters: {
            brand: [],
            frets: [],
            wood: [],
            price: []
        }
    }

    componentDidMount() {
        this.props.dispatch(getBrands());
        this.props.dispatch(getWoods());

        this.props.dispatch(getProductToShop(
            this.state.skip,
            this.state.limit,
            this.state.filters
        ));
    }

    handlePrice = (value) => {
        const data = price;
        let array = [];

        for(let key in data){
            if(data[key]._id === parseInt(value, 10)){
                array = data[key].array
            }
        }

        return array;
    }

    handleFilters = (filter, category) => {
        const newFilters = {...this.state.filters}
        newFilters[category] = filter;

        if(category === 'price'){
            let priceValue = this.handlePrice(filter);
            newFilters[category] = priceValue;
        }
        this.showFilteredResults(newFilters);
        this.setState({
            filters: newFilters
        });
    }

    showFilteredResults = (filters) => {
        this.props.dispatch(getProductToShop(
            0,
            this.state.limit,
            filters
        )).then(() => {
            this.setState({
                skip: 0
            })
        });
    }

    render() {

        const products = this.props.products;
        return (
            <div>
                <PageTop 
                    title="Browse Products"
                />
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                            <CollapseCheckbox 
                                initState={true}
                                title="Brands"
                                list={products.brands}
                                handleFilters={(filter) => this.handleFilters(filter, 'brand')}
                            />
                            <CollapseCheckbox 
                                initState={false}
                                title="Frets"
                                list={frets}
                                handleFilters={(filter) => this.handleFilters(filter, 'frets')}
                            />
                            <CollapseCheckbox 
                                initState={false}
                                title="Wood"
                                list={products.woods}
                                handleFilters={(filter) => this.handleFilters(filter, 'wood')}
                            />
                            <CollapseRadio 
                                initState={true}
                                title="Price"
                                list={price}
                                handleFilters={(filter) => this.handleFilters(filter, 'price')}
                            />
                        </div>
                        <div className="right">
                            right
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Shop);