import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducer/authReducer';
import { miniSeriesReducer } from '../reducer/miniSeriesReducer';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    mi: miniSeriesReducer
});

export const store =  createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )

);