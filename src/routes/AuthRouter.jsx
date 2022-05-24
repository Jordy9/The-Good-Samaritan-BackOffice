import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Navb } from '../Components/navbar/Navb';
import { Dashboard } from '../Components/dashboard/Dashboard';
import { Profile } from '../Components/profile/Profile';
import { MiniSeries } from '../Components/miniSeries/MiniSeries';
import { Sketch } from '../Components/sketch/Sketch';
import { Petitions } from '../Components/petition/Petitions';
import { Events } from '../Components/event/Events';
import {SketchsList} from '../Components/sketch/sketchsList/SketchsList'
import { LivesZoom } from '../Components/live/LivesZoom';
import { Main } from '../Components/main/Main';
import { GalleryImages } from '../Components/gallery/GalleryImages';
import { MiniSeriesList } from '../Components/miniSeries/miniseriesLisr/MiniSeriesList';
import { PetitionList } from '../Components/petition/petitionsList/PetitionList';
import { EventsList } from '../Components/event/eventsList/EventsList';
import { MainList } from '../Components/main/mainsList/MainList';
import { GalleryList } from '../Components/gallery/galleryList/GalleryList';
// import { CapsulesList } from '../Components/capsule/capsuleList/CapsulesList';
// import { Capsule } from '../Components/capsule/Capsule';
import { Contact } from '../Components/contact/Contact';
import { PetitionListUser } from '../Components/petition/petitionsListUser/PetitionListUser';
import { PetitionListSinCuenta } from '../Components/petition/petitionsListSinCuenta/PetitionListSinCuenta';
import { Youtube } from '../Components/youtube/Youtube';
import { YoutubeList } from '../Components/youtube/youtubeList/YoutubeList';
import { VideoWordOfTheDay } from '../Components/videoWordOfTheDay/VideoWordOfTheDay'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { videoWordOfTheDayList } from '../Components/videoWordOfTheDay/videoWordOfTheDayList/VideoWordOfTheDayList';
import { NoBeleaverVideo } from '../Components/noBeleaver/NoBeleaverVideo';
import { NotificationResponsive } from '../Components/notificationResponsive/NotificationResponsive';
import { Beleaver } from '../Components/Beleaver/Beleaver';
import { BeleaverList } from '../Components/Beleaver/BeleaverList/BeleaverList';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { NotificationPost } from '../Components/notificationPost/NotificationPost';
import { ImageVideo } from '../Components/imageVideo/ImageVideo';
import { SoundMessage } from '../Components/soundMessage/SoundMessage';
import { RemoveNewNotificacion } from '../action/notifications';
import { ChatScreen } from '../Components/chat2.0/ChatScreen';

export const AuthRouter = () => {

    const dispatch = useDispatch()

    const {Contactos} = useSelector(state => state.co)
    const {Peticiones, PeticionSinCuenta, PeticionesUser} = useSelector(state => state.pt)
    const {socket} = useSelector(state => state.sk)

    const {notificationPost, activeUser} = useSelector(state => state.auth)

    const history = useHistory()

    const {pathname} = useLocation()

    const {newNotfification} = useSelector(state => state.nt)

    if (moment().day() > 7 && Peticiones) {
        const peticionesviejas = Peticiones?.filter(cont => moment(cont?.date, "YYYYMMDD").fromNow() > 'hace 7 días')
        const peticionesviejasSinCuenta = PeticionSinCuenta?.filter(cont => moment(cont?.date, "YYYYMMDD").fromNow() > 'hace 7 días')
        const peticionesviejasUser = PeticionesUser?.filter(cont => moment(cont?.date, "YYYYMMDD").fromNow() > 'hace 7 días')
        const contactosViejos = Contactos?.filter(cont => moment(cont?.date, "YYYYMMDD").fromNow() > 'hace 7 días')
        socket?.emit('Eliminar-Contactos', contactosViejos, peticionesviejas, peticionesviejasSinCuenta, peticionesviejasUser)
    }

    useEffect(() => {
        if (pathname === '/NotificationPost' && NotificationPost === '') {
          history.push('/Dashboard')
        }
    }, [notificationPost, history, pathname])

    useEffect(() => {

        if (newNotfification) {
            SoundMessage()
            dispatch(RemoveNewNotificacion())
        }
    }, [newNotfification, dispatch])

    return (
        <>
        <Navb />
        <Container>
            <div className = 'my-4'>
                <Switch>
                    <Route path = '/Dashboard' component = {Dashboard} />
                    <Route path = '/WordOfTheDay' component = {VideoWordOfTheDay} />
                    <Route path = '/WordOfTheDayList' component = {videoWordOfTheDayList} />
                    <Route path = '/MiniSerie' component = {MiniSeries} />
                    <Route path = '/MiniSeriesList' component = {MiniSeriesList} />
                    <Route path = '/Sketch' component = {Sketch} />
                    <Route path = '/SketchsList' component = {SketchsList} />
                    {/* <Route path = '/Capsule' component = {Capsule} />
                    <Route path = '/CapsulesList' component = {CapsulesList} /> */}
                    <Route path = '/Petition' component = {Petitions} />
                    <Route path = '/PetitionsList' component = {PetitionList} />
                    <Route path = '/PetitionsListUser' component = {PetitionListUser} />
                    <Route path = '/PetitionsListwhithoutAccount' component = {PetitionListSinCuenta} />
                    <Route path = '/Event' component = {Events} />
                    <Route path = '/EventsList' component = {EventsList} />
                    <Route path = '/LivesZoom' component = {LivesZoom} />
                    <Route path = '/Main' component = {Main} />
                    <Route path = '/MainList' component = {MainList} />
                    <Route path = '/Gallery-Images' component = {GalleryImages} />
                    <Route path = '/GalleryList' component = {GalleryList} />
                    <Route path = '/Profile' component = {Profile} />
                    <Route path = '/ContactList' component = {Contact} />
                    <Route path = '/LinkYoutube' component = {Youtube} />
                    <Route path = '/YoutubeList' component = {YoutubeList} />
                    <Route path = '/NoBeleaver' component = {NoBeleaverVideo} />
                    <Route path = '/Beleaver' component = {Beleaver} />
                    <Route path = '/BeleaverList' component = {BeleaverList} />
                    <Route path = '/Chat' component = {ChatScreen} />
                    <Route path = '/NotificationResponsive' component = {NotificationResponsive} />
                    <Route path = '/NotificationPost/:id' component = {NotificationPost} />
                    <Route path = '/ImageVideo' component = {ImageVideo} />
                    
                    {
                        (activeUser)
                            &&
                        (activeUser?.role === 'Colaborador')
                            &&
                        <Redirect to = '/PetitionsList' />
                    }

                    {
                        (activeUser)
                            &&
                        (activeUser?.role !== 'Colaborador')
                            &&
                        <Redirect to = '/Dashboard' />
                    }
                </Switch>
            </div>
        </Container>
    </>
    )
}
