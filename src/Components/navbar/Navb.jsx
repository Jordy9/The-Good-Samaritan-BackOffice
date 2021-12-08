import { Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { startLogout } from '../../action/auth'
import perfil1 from '../../heroes/Perfil1.jpg'
import { Sidebar } from '../sidebar/Sidebar'
import './Navb.css'


export const Navb = () => {
    const dispatch = useDispatch()

    const handledLogout = () => {
        dispatch(startLogout())
    }

    return (
        <div className = 'floatt'>
            <Navbar className = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12' expand="lg" bg = 'dark' variant="dark">
                <Sidebar />
                <Container>
                    <Navbar.Brand style = {{cursor: 'pointer'}} >
                        <span className = 'Navb-tittle d-flex justify-content-end'>
                            <NavLink style = {{textDecoration: 'none', color: 'white'}} to = '/Dashboard'>El buen Samaritano</NavLink>
                        </span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="me-auto">

                    </Nav>

                    <Nav>
                        {/* <i className="bi bi-person-circle" style = {{fontSize: '32px', cursor: 'pointer', color: 'white'}}></i> */}
                        <NavLink to = '/Profile'><img src={perfil1} className = 'img-fluid rounded-circle' style = {{width: '32px', height: '32px', cursor: 'pointer', top: '5px', position: 'relative', padding: '0px', margin: '0px'}} alt="" /></NavLink>
                        <NavLink to = '/Login' onClick = {handledLogout} className = 'nav-link mt-1'>Cerrar sesión</NavLink>
                    </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
