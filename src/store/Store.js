import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducer/authReducer';
import { beleaverReducer } from '../reducer/beleaverReducer';
import { bosquejosReducer } from '../reducer/bosquejosReducer';
import { capsulesReducer } from '../reducer/capsuleReducer';
import { chatReducer } from '../reducer/chatReducer';
import { contactReducer } from '../reducer/contactReducer';
import { eventsReducer } from '../reducer/eventReducer';
import { galleryReducer } from '../reducer/galleryReducer';
import { mainReducer } from '../reducer/mainReducer';
import { miniSeriesReducer } from '../reducer/miniSeriesReducer';
import { noBeleaverReducer } from '../reducer/noBeleaverReducer';
import { notificacionReducer } from '../reducer/notificacionReducer';
import { petitionsReducer } from '../reducer/petitionReducer';
import { progressBarReducer } from '../reducer/progressBarReducer';
import { socketReducer } from '../reducer/socketReducer';
import { userReducer } from '../reducer/userReducer';
import { VideoWordOfTheDayReducer } from '../reducer/VideoWordOfTheDayReducer';
import { youtubeReducer } from '../reducer/youtubeReducer';
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
    yt: youtubeReducer,
    sk: socketReducer,
    cht: chatReducer,
    nt: notificacionReducer,
    vwd: VideoWordOfTheDayReducer,
    nb: noBeleaverReducer,
    chb: progressBarReducer,
    bl: beleaverReducer
});

export const store =  createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )

);