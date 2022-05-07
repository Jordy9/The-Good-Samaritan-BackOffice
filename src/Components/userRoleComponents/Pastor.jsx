import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { NavLink } from 'react-router-dom'

export const Pastor = () => {

  return (
    <>
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

        {/* <Offcanvas.Header>
            <Offcanvas.Title>Cápsulas</Offcanvas.Title>
        </Offcanvas.Header>

        <ul className="list-group list-group-flush">
            <NavLink to = '/Capsule' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-activity"> </i>Cápsula</NavLink>
            <NavLink to = '/CapsulesList' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de Cápsulas</NavLink>
        </ul> */}

        <Offcanvas.Header>
            <Offcanvas.Title>Peticiones de oración</Offcanvas.Title>
        </Offcanvas.Header>

        <ul className="list-group list-group-flush">
            <NavLink to = '/Petition' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-pencil-square"> </i>Petición de oración</NavLink>
            <NavLink to = '/PetitionsList' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de Peticiones de oración de pastores</NavLink>
        </ul>

    </>
  )
}
