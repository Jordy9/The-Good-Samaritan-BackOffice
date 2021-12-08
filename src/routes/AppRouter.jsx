import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { startAuthCheking, startGetUsers } from '../action/auth';
import { startGetMiniSeries } from '../action/miniSerie';
import { Footer } from '../Components/footer/Footer';
import { LoginScreen } from '../Components/login/LoginScreen';
import { Spinner } from '../Components/spinner/Spinner';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {


    const dispatch = useDispatch();
    const {checking, uid} = useSelector(state => state.auth)
    console.log(checking)

    useEffect(() => {
        dispatch(startAuthCheking());
        dispatch(startGetUsers());
        dispatch(startGetMiniSeries())
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
