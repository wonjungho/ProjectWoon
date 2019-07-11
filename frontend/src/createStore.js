import{
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import logger from 'redux-logger'
import {connectRouter,routerMiddleware} from 'connected-react-router'
import * as reducers from './reducers'

export default function createStore(history){
    return reduxCreateStore(
        combineReducers({
            ...reducers,
            router:connectRouter(history)
        }),
        applyMiddleware(
            logger,
            routerMiddleware(history)
        )
    )
}