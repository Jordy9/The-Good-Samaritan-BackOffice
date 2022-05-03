import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { NavLink } from 'react-router-dom'

export const Colaborador = ({changeColor}) => {

  return (
    <>
        <Offcanvas.Header>
            <Offcanvas.Title>Peticiones de oración</Offcanvas.Title>
        </Offcanvas.Header>

        <ul className="list-group list-group-flush">
            <NavLink to = '/PetitionsList' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de Peticiones de oración de pastores</NavLink>
            <NavLink to = '/PetitionsListUser' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de Peticiones de oración de usuarios</NavLink>
            <NavLink to = '/PetitionsListwhithoutAccount' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de Peticiones de oración de usuarios sin cuenta</NavLink>
        </ul>

        <Offcanvas.Header>
            <Offcanvas.Title>Listado de Contactos</Offcanvas.Title>
        </Offcanvas.Header>

        <ul className="list-group list-group-flush">        
            <NavLink to = '/ContactList' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-list-ul"> </i>Listado de Contactos</NavLink>
        </ul>

        <Offcanvas.Header>
            <Offcanvas.Title>Chat</Offcanvas.Title>
        </Offcanvas.Header>

        <ul className="list-group list-group-flush">  
            <NavLink to = '/Chat' className = 'list-group-item decoration-line list-focus' activeClassName = 'true'><i className="bi bi-chat-text-fill" style={{color: (changeColor) && 'red'}}> </i>Chat</NavLink>
        </ul>
    </>
  )
}
