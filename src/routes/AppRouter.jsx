import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from 'react-router-dom';
import { setActiveUser, startAuthCheking, startGetUsers, startGetUsersUsuarios } from '../action/auth';
import { startGetPaginateCapsules } from '../action/capsule';
import { activeMessage, isTyping } from '../action/chat';
import { startGetPaginateContact } from '../action/contact';
import { startGetPaginateEventos } from '../action/event';
import { startGetPaginateGallery } from '../action/gallery';
import { startGetPaginateMains } from '../action/main';
import { startGetPaginateMiniSeries } from '../action/miniSerie';
import { startGetPaginatePetitionUser, startGetPaginatePetitions, startGetPaginatePetitionSinCuenta } from '../action/petition';
import { startGetPaginateBosquejos } from '../action/sketch';
import { startSocket } from '../action/socket';
import { startGetPaginateYoutube } from '../action/youtubeImage';
import { startGetZoom } from '../action/zoom';
// import { Footer } from '../Components/footer/Footer';
import { LoginScreen } from '../Components/login/LoginScreen';
import { Spinner } from '../Components/spinner/Spinner';
import { useSocket } from '../hooks/useSocket';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import moment from 'moment';
import 'moment/locale/es';
import { cargarNotificaciones } from '../action/notifications';
import { startGetNoBeleaverVideo } from '../action/videoNoBeleaver';
import { startGetBeleaver } from '../action/beleaver';
import { ForgotPassword } from '../Components/forgotPassword/ForgotPassword';
import { ResetPassword } from '../Components/forgotPassword/ResetPassword';
import { startGetImageVideo } from '../action/imageVideo';
import { startGetPaginateVideos } from '../action/VideoWordOfTheDay';

moment.locale('es');

export const AppRouter = () => {

    const dispatch = useDispatch();
    const {checking, uid} = useSelector(state => state.auth)

    const {socket, online, conectarSocket, desconectarSocket} = useSocket(`${process.env.REACT_APP_API_URL.split('/api')[0]}`)

    const token = localStorage.getItem('tokenn')

    useEffect(() => {
        dispatch(startAuthCheking());
        dispatch(startGetUsers());
        dispatch(startGetPaginateMiniSeries())
        dispatch(startGetPaginateBosquejos())
        dispatch(startGetPaginatePetitions())
        dispatch(startGetPaginatePetitionUser())
        dispatch(startGetPaginatePetitionSinCuenta())
        dispatch(startGetPaginateEventos())
        dispatch(startGetZoom())
        dispatch(startGetPaginateMains())
        dispatch(startGetPaginateGallery())
        dispatch(startGetPaginateCapsules())
        dispatch(startGetPaginateContact())
        dispatch(setActiveUser())
        dispatch(startGetPaginateYoutube())
        dispatch(cargarNotificaciones())
        dispatch(startGetPaginateVideos())
        dispatch(startGetNoBeleaverVideo())
        dispatch(startGetBeleaver())
        dispatch(startGetUsersUsuarios())
        dispatch(startGetImageVideo())
    }, [dispatch])

    useEffect(() => {
        if (uid) {
            conectarSocket()
        }
    }, [uid, conectarSocket])

    useEffect(() => {
        if (!uid) {
            desconectarSocket()
        }
    }, [uid, desconectarSocket])

    useEffect(() => {
        dispatch(startSocket(socket, online))
    }, [dispatch, socket, online])

    useEffect(() => {
        socket?.on('mensaje-personal', (mensaje) => {
            dispatch(activeMessage(mensaje))
        })
    }, [socket, dispatch])

    useEffect(() => {
        socket?.on('escribiendo-admin', (typing) => {
            dispatch(isTyping(typing))
        })
    }, [socket, dispatch])

    if (checking) {
        return <Spinner />
    }
    
    return (
        <Router>

            <div>
                <Switch>

                    <PublicRoute exact path = '/Login' component = {LoginScreen} isAuthenticated = {!!uid} />
                    <Route exact path = '/ForgotPassword' component = {ForgotPassword} />
                    <Route exact path = {`/resetPassword/${token}`} component = {ResetPassword} />
                    <PrivateRoute Route path = '/' component = {AuthRouter} isAuthenticated = {!!uid} />

                    <Redirect to = '/Login' />
                </Switch>
            </div>

        </Router>
    )
}
