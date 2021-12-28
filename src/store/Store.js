import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducer/authReducer';
import { bosquejosReducer } from '../reducer/bosquejosReducer';
import { capsulesReducer } from '../reducer/capsuleReducer';
import { contactReducer } from '../reducer/contactReducer';
import { eventsReducer } from '../reducer/eventReducer';
import { galleryReducer } from '../reducer/galleryReducer';
import { mainReducer } from '../reducer/mainReducer';
import { miniSeriesReducer } from '../reducer/miniSeriesReducer';
import { petitionsReducer } from '../reducer/petitionReducer';
import { userReducer } from '../reducer/userReducer';
// import { youtubeReducer } from '../reducer/youtubeReducer';
import { zoomReducer } from '../reducer/zoomReducer';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    us: userReducer,
    mi: miniSeriesReducer,
    skt: bosquejosReducer,
    pt: petitionsReducer,
    ev: eventsReducer,
    zm: zoomReducer,
    ma: mainReducer,
    ga: galleryReducer,
    ca: capsulesReducer,
    co: contactReducer,
    // yt: youtubeReducer,
});

export const store =  createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )

);