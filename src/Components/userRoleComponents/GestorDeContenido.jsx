import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { NavLink } from 'react-router-dom'

export const GestorDeContenido = () => {

  return (
    <>
        <Offcanvas.Header>
            <Offcanvas.Title>Usuarios</Offcanvas.Title>
        </Offcanvas.Header>

        <ul className="list-group list-group-flush">
            <NavLink to = '/Dashboard' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-person-lines-fill"> </i>Usuarios</NavLink>
        </ul>

        <Offcanvas.Header>
            <Offcanvas.Title>Palabra del día</Offcanvas.Title>
        </Offcanvas.Header>

        <ul className="list-group list-group-flush">
            <NavLink to = '/WordOfTheDay' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-file-play"> </i>Palabra del día</NavLink>
            <NavLink to = '/WordOfTheDayList' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de Palabra del día</NavLink>
        </ul>

        <Offcanvas.Header>
            <Offcanvas.Title>Eventos</Offcanvas.Title>
        </Offcanvas.Header>

        <ul className="list-group list-group-flush">
            <NavLink to = '/Event' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-calendar2-event"> </i>Evento</NavLink>                
            <NavLink to = '/EventsList' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de Eventos</NavLink>                
        </ul>

        <Offcanvas.Header>
            <Offcanvas.Title>Zoom</Offcanvas.Title>
        </Offcanvas.Header>

        <ul className="list-group list-group-flush">        
            <NavLink to = '/LivesZoom' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-camera-reels"> </i>Zoom</NavLink>
        </ul>

        <Offcanvas.Header>
            <Offcanvas.Title>Página principal</Offcanvas.Title>
        </Offcanvas.Header>

        <ul className="list-group list-group-flush">        
            <NavLink to = '/Main' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-collection"> </i>Carrusel principal</NavLink>
            <NavLink to = '/MainList' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado del carrusel</NavLink>                
            <NavLink to = '/imageVideo' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-record-btn"> </i>Banner de la página de home</NavLink>
        </ul>

        <Offcanvas.Header>
            <Offcanvas.Title>Galería</Offcanvas.Title>
        </Offcanvas.Header>

        <ul className="list-group list-group-flush">        
            <NavLink to = '/Gallery-images' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-images"> </i>Galería de imagenes</NavLink>
            <NavLink to = '/GalleryList' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de la galería</NavLink>                
        </ul>

        <Offcanvas.Header>
            <Offcanvas.Title>Youtube Links</Offcanvas.Title>
        </Offcanvas.Header>

        <ul className="list-group list-group-flush">   
            <NavLink to = '/LinkYoutube' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-link-45deg"> </i>Link de videos de youtube</NavLink>
            <NavLink to = '/YoutubeList' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de links de videos de youtube</NavLink>                
        </ul>

        <Offcanvas.Header>
            <Offcanvas.Title>Video para no creyentes</Offcanvas.Title>
        </Offcanvas.Header>

        <ul className="list-group list-group-flush">   
            <NavLink to = '/NoBeleaver' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-person-video3"> </i>Video para no creyentes</NavLink>
        </ul>

        <Offcanvas.Header>
            <Offcanvas.Title>Información para nuevos creyentes</Offcanvas.Title>
        </Offcanvas.Header>

        <ul className="list-group list-group-flush">   
            <NavLink to = '/Beleaver' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-person-video2"> </i>Información para nuevos creyentes</NavLink>
            <NavLink to = '/BeleaverList' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de Información para nuevos creyentes</NavLink>                
        </ul>
    </>
  )
}
