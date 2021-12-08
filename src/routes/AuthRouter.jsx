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
import { PetitionsList } from '../Components/petition/petitionsList/PetitionsList';
import { EventsList } from '../Components/event/eventsList/EventsList';
import {MiniSeriesList} from '../Components/miniSeries/miniSeriesList/MiniSeriesList'
import { LivesZoom } from '../Components/live/LivesZoom';
import { Main } from '../Components/main/Main';
import { ImagesHome } from '../Components/main/ImagesHome';
import { GalleryImages } from '../Components/gallery/GalleryImages';

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
                    <Route path = '/Petition' component = {Petitions} />
                    <Route path = '/PetitionsList' component = {PetitionsList} />
                    <Route path = '/Event' component = {Events} />
                    <Route path = '/EventsList' component = {EventsList} />
                    <Route path = '/LivesZoom' component = {LivesZoom} />
                    <Route path = '/Main' component = {Main} />
                    <Route path = '/Images-home' component = {ImagesHome} />
                    <Route path = '/Gallery-Images' component = {GalleryImages} />
                    <Route path = '/Profile' component = {Profile} />
                    
                    <Redirect to = '/Dashboard' />
                </Switch>
            </div>
        </Container>
    </>
    )
}
