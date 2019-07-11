import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
// import {createStore,combineReducers,applyMiddleware} from 'redux'
// import logger from 'redux-logger'
// import * as reducers from './reducers'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import createStore from './createStore'
const history =createBrowserHistory()

const store =createStore(history)

ReactDOM.render(
<Provider store={store}>
    <ConnectedRouter history={history}>
    <App />
    </ConnectedRouter>
</Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
