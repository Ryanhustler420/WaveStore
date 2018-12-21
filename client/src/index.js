import React from 'react';
import ReactDOM from 'react-dom';
import './Resources/css/styles.css';

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import Reducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const App = (
    <Provider 
        store={
            createStoreWithMiddleware(
                Reducer, 
                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // for browser devTool Extention
            )
        }  
    >
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( App, document.getElementById('root'));