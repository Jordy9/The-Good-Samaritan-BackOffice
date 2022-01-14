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
import { CapsulesList } from '../Components/capsule/capsuleList/CapsulesList';
import { Capsule } from '../Components/capsule/Capsule';
import { Contact } from '../Components/contact/Contact';
import { PetitionListUser } from '../Components/petition/petitionsListUser/PetitionListUser';
import { PetitionListSinCuenta } from '../Components/petition/petitionsListSinCuenta/PetitionListSinCuenta';
import { Youtube } from '../Components/youtube/Youtube';
import { YoutubeList } from '../Components/youtube/youtubeList/YoutubeList';
import { ChatPage } from '../Components/chat/ChatPage';

export const AuthRouter = () => {
    return (
        <>
        <Navb />
        <Container>
            <div className = 'my-4'>
                <Switch>
                    <Route path = '/Dashboard' component = {Dashboard} />
                    <Route path = '/MiniSerie' component = {MiniSeries} />
                    <Route path = '/MiniSeriesList' component = {MiniSeriesList} />
                    <Route path = '/Sketch' component = {Sketch} />
                    <Route path = '/SketchsList' component = {SketchsList} />
                    <Route path = '/Capsule' component = {Capsule} />
                    <Route path = '/CapsulesList' component = {CapsulesList} />
                    <Route path = '/Petition' component = {Petitions} />
                    <Route path = '/PetitionsList' component = {PetitionList} />
                    <Route path = '/PetitionsListUser' component = {PetitionListUser} />
                    <Route path = '/PetitionsListwhithoutAccount' component = {PetitionListSinCuenta} />
                    <Route path = '/Event' component = {Events} />
                    <Route path = '/EventsList' component = {EventsList} />
                    <Route path = '/LivesZoom' component = {LivesZoom} />
                    <Route path = '/Main' component = {Main} />
                    <Route path = '/MainList' component = {MainList} />
                    {/* <Route path = '/Images-home' component = {ImagesHome} /> */}
                    <Route path = '/Gallery-Images' component = {GalleryImages} />
                    <Route path = '/GalleryList' component = {GalleryList} />
                    <Route path = '/Profile' component = {Profile} />
                    <Route path = '/ContactList' component = {Contact} />
                    <Route path = '/LinkYoutube' component = {Youtube} />
                    <Route path = '/YoutubeList' component = {YoutubeList} />
                    <Route path = '/Chat' component = {ChatPage} />
                    
                    <Redirect to = '/Dashboard' />
                </Switch>
            </div>
        </Container>
    </>
    )
}
