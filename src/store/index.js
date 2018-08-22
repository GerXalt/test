import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import app from './app'

const reducers = combineReducers({
    app
});

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));