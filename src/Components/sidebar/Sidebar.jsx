import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'

export const Sidebar = () => {

    const {activeUser} = useSelector(state => state.auth)

        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

    return (
        <>
            <i style = {{cursor: 'pointer', color: 'white', fontSize: '25px', marginLeft: '30px'}} onClick={handleShow} className="bi bi-list"></i>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>{activeUser?.name} {activeUser?.lastName}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                <Offcanvas.Header>
                    <Offcanvas.Title>Usuarios</Offcanvas.Title>
                </Offcanvas.Header>

                <ul className="list-group list-group-flush">
                    <NavLink to = '/Dashboard' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-person-lines-fill"> </i>Usuarios</NavLink>
                </ul>

                <Offcanvas.Header>
                    <Offcanvas.Title>Series</Offcanvas.Title>
                </Offcanvas.Header>

                <ul className="list-group list-group-flush">
                    <NavLink to = '/MiniSerie' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-tv-fill"> </i>Mini Serie</NavLink>
                    <NavLink to = '/MiniSeriesList' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de Mini Series</NavLink>
                </ul>

                <Offcanvas.Header>
                    <Offcanvas.Title>Bosquejos</Offcanvas.Title>
                </Offcanvas.Header>

                <ul className="list-group list-group-flush">
                    <NavLink to = '/Sketch' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-file-text-fill"> </i>Bosquejo</NavLink>
                    <NavLink to = '/SketchsList' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de Bosquejos</NavLink>
                </ul>

                <Offcanvas.Header>
                    <Offcanvas.Title>Cápsulas</Offcanvas.Title>
                </Offcanvas.Header>

                <ul className="list-group list-group-flush">
                    <NavLink to = '/Capsule' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-activity"> </i>Cápsula</NavLink>
                    <NavLink to = '/CapsulesList' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de Cápsulas</NavLink>
                </ul>

                <Offcanvas.Header>
                    <Offcanvas.Title>Peticiones</Offcanvas.Title>
                </Offcanvas.Header>

                <ul className="list-group list-group-flush">
                    <NavLink to = '/Petition' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-pencil-square"> </i>Petición</NavLink>
                    <NavLink to = '/PetitionsList' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de Peticiónes</NavLink>
                    <NavLink to = '/PetitionsListUser' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de Peticiónes de usuarios</NavLink>
                    <NavLink to = '/PetitionsListwhithoutAccount' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de Peticiónes de usuarios sin cuenta</NavLink>
                </ul>

                <Offcanvas.Header>
                    <Offcanvas.Title>Eventos</Offcanvas.Title>
                </Offcanvas.Header>

                <ul className="list-group list-group-flush">
                    <NavLink to = '/Event' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-calendar2-event"> </i>Evento</NavLink>                
                    <NavLink to = '/EventsList' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de Eventos</NavLink>                
                </ul>

                <Offcanvas.Header>
                    <Offcanvas.Title>En vivo</Offcanvas.Title>
                </Offcanvas.Header>

                <ul className="list-group list-group-flush">        
                    <NavLink to = '/LivesZoom' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-camera-reels"> </i>Zoom</NavLink>
                </ul>

                <Offcanvas.Header>
                    <Offcanvas.Title>Página principal</Offcanvas.Title>
                </Offcanvas.Header>

                <ul className="list-group list-group-flush">        
                    <NavLink to = '/Main' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-collection"> </i>Carrusel principal</NavLink>
                    {/* <NavLink to = '/Images-home' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-images"> </i>Imagenes Home</NavLink> */}
                    <NavLink to = '/MainList' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado del carrusel</NavLink>                
                </ul>

                <Offcanvas.Header>
                    <Offcanvas.Title>Galería</Offcanvas.Title>
                </Offcanvas.Header>

                <ul className="list-group list-group-flush">        
                    <NavLink to = '/Gallery-images' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-images"> </i>Galería de imagenes</NavLink>
                    <NavLink to = '/GalleryList' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de la galería</NavLink>                
                </ul>

                <Offcanvas.Header>
                    <Offcanvas.Title>Listado de Contácto</Offcanvas.Title>
                </Offcanvas.Header>

                <ul className="list-group list-group-flush">        
                    <NavLink to = '/ContactList' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de Contácto</NavLink>
                </ul>

                <Offcanvas.Header>
                    <Offcanvas.Title>Youtube Links</Offcanvas.Title>
                </Offcanvas.Header>

                <ul className="list-group list-group-flush">   
                    <NavLink to = '/LinkYoutube' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-link-45deg"> </i>Link de videos de youtube</NavLink>
                    <NavLink to = '/YoutubeList' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de links de videos de youtube</NavLink>                
                </ul>

                <Offcanvas.Header>
                    <Offcanvas.Title>Chat</Offcanvas.Title>
                </Offcanvas.Header>

                <ul className="list-group list-group-flush">   
                    <NavLink to = '/Chat' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-chat-text-fill"> </i>Chat</NavLink>
                </ul>

                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}