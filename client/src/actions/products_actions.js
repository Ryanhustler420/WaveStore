import axios from 'axios';
import { PRODUCT_SERVER } from './../components/utils/misc';
import { 
    GET_PRODUCTS_BY_ARRIVAL,
    GET_PRODUCTS_BY_SELL,
    GET_BRANDS,
    GET_WOODS,
    GET_PRODUCT_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT
} from './types';

export function getProductsBySell() {
    // sortBy=sold&order=desc&limit=4
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
        .then(response => response.data);

        return {
            type: GET_PRODUCTS_BY_SELL,
            payload: request
        }
}

export function getProductsByArrival() {
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
        .then(response => response.data);

        return {
            type: GET_PRODUCTS_BY_ARRIVAL,
            payload: request
        }
}

export function getProductToShop(skip, limit, filters = [], previousState = []) {
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${PRODUCT_SERVER}/shop`, data)
        .then(response => {

            let newState = [
                ...previousState,
                ...response.data.articles
            ]

            return {
                size: response.data.size,
                articles: newState
            }
        });


        return {
            type: GET_PRODUCT_TO_SHOP,
            payload: request
        }
}

export function addProduct(dataToSubmit) {
    const request = axios.post(`${PRODUCT_SERVER}/article`, dataToSubmit)
        .then(response => response.data);


        return {
            type: ADD_PRODUCT,
            payload: request
        }
}


export function clearProductReduxState() {
    return {
        type: CLEAR_PRODUCT,
        payload: ''
    }
}

///////////////////////////////////
///////     CATEGORIES
///////////////////////////////////

// getBrands, getWoods

export function getBrands() {
    const request = axios.get(`${PRODUCT_SERVER}/brands`)
        .then(response => response.data);

        return {
            type: GET_BRANDS,
            payload: request
        }
}

export function getWoods() {
    const request = axios.get(`${PRODUCT_SERVER}/woods`)
    .then(response => response.data);

    return {
        type: GET_WOODS,
        payload: request
    }
}