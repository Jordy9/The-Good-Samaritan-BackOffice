import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Administrador } from '../userRoleComponents/Administrador';
import { Colaborador } from '../userRoleComponents/Colaborador';
import { GestorDeContenido } from '../userRoleComponents/GestorDeContenido';
import { Pastor } from '../userRoleComponents/Pastor';
import './Sidebar.css'

export const Sidebar = () => {

    const {pathname} = useLocation()

    const {activeUser, uid} = useSelector(state => state.auth)
    const {notificaciones} = useSelector(state => state.nt)

    const [show, setShow] = useState(false);

    const [changeColor, setChangeColor] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (notificaciones.filter(not => not.to === uid).length !== 0) {
            notificaciones?.map(notificaciones => (notificaciones.to === uid && notificaciones.length !== 0) && setChangeColor(true))
        } else {
            setChangeColor(false)
        }    
    }, [notificaciones, pathname, uid]);

    return (
        <>
            <i id='logo-list' style = {{cursor: 'pointer', color: 'white', fontSize: '25px', marginLeft: '30px'}} onClick={handleShow} className="bi bi-list"></i>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>{activeUser?.name} {activeUser?.lastName}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                {
                    (activeUser)
                        &&
                    (activeUser?.role === 'Administrador')
                        &&
                    <Administrador changeColor={changeColor} />
                }

                {
                    (activeUser)
                        &&
                    (activeUser?.role === 'Gestorcontenido')
                        &&
                    <GestorDeContenido changeColor={changeColor} />
                }

                {
                    (activeUser)
                        &&
                    (activeUser?.role === 'Colaborador')
                        &&
                    <Colaborador changeColor={changeColor} />
                }

                {
                    (activeUser)
                        &&
                    (activeUser?.role === 'Pastor')
                        &&
                    <Pastor />
                }

                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
