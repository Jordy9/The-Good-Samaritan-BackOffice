import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { startAuthCheking, startGetUsers } from '../action/auth';
import { startGetCapsules } from '../action/capsule';
import { startGetContact } from '../action/contact';
import { startGetEventos } from '../action/event';
import { startGetGallery } from '../action/gallery';
import { startGetMains } from '../action/main';
import { startGetMiniSeries } from '../action/miniSerie';
import { startGetPetitionesUser, startGetPetitions, startGetPetitionSinCuenta } from '../action/petition';
import { startGetBosquejos } from '../action/sketch';
import { startGetYoutube } from '../action/youtubeImage';
import { startGetZoom } from '../action/zoom';
import { Footer } from '../Components/footer/Footer';
import { LoginScreen } from '../Components/login/LoginScreen';
import { Spinner } from '../Components/spinner/Spinner';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const {checking, uid} = useSelector(state => state.auth)


    useEffect(() => {
        dispatch(startAuthCheking());
        dispatch(startGetUsers());
        dispatch(startGetMiniSeries())
        dispatch(startGetBosquejos())
        dispatch(startGetPetitions())
        dispatch(startGetPetitionesUser())
        dispatch(startGetPetitionSinCuenta())
        dispatch(startGetEventos())
        dispatch(startGetZoom())
        dispatch(startGetMains())
        dispatch(startGetGallery())
        dispatch(startGetCapsules())
        dispatch(startGetContact())
        // dispatch(startGetYoutube())
    }, [dispatch])


    if (checking) {
        return <Spinner />
    }
    

    return (
        <Router>

            <div>
                <Switch>

                    <PublicRoute exact path = '/Login' component = {LoginScreen} isAuthenticated = {!!uid} />
                    <PrivateRoute Route path = '/' component = {AuthRouter} isAuthenticated = {!!uid} />

                    <Redirect to = '/Login' />
                </Switch>
            </div>

            <div className = 'mt-5'>
                <Footer />
            </div>

        </Router>
    )
}
