import { Container, Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setActiveUser, startLogout } from '../../action/auth'
import logo from '../../heroes/logo.png'
import { Sidebar } from '../sidebar/Sidebar'
import './Navb.css'


export const Navb = () => {
    const dispatch = useDispatch()

    const {activeUser} = useSelector(state => state.auth)

    const handledLogout = () => {
        dispatch(startLogout())
    }

    return (
        <Navbar fixed='top' className = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12' expand="lg" bg = 'dark' variant="dark">
            <Container fluid>
            <Sidebar />
                <Navbar.Brand style = {{cursor: 'pointer', margin: 0, padding: 0}} >
                    <span className = 'Navb-tittle d-flex justify-content-end align-items-center'>
                        <img id='logo-logo' src={logo} className='img-fluid' style={{width: 'auto', height: '40px', marginLeft: '60px'}} alt="" />
                        <NavLink id='title-logo' style = {{textDecoration: 'none', color: 'white'}} to = '/Dashboard'>Centro Cristiano El Buen Samaritano</NavLink>
                    </span>
                </Navbar.Brand>

                <Nav className="me-auto">

                </Nav>

                <Nav id='nav-hidden-right'>
                    <NavLink onClick={() => dispatch(setActiveUser())} to = '/Profile'>{(activeUser?.urlImage) ? <img src={activeUser?.urlImage} className='img-fluid rounded-circle mt-2' style = {{width: '32px', height: '32px', cursor: 'pointer', margin: 0}} alt='' /> : <i className="bi bi-person-circle" style = {{fontSize: '32px', cursor: 'pointer', color: 'white', margin: 0}}></i>}</NavLink>
                    <NavLink to = '/Login' onClick = {handledLogout} className = 'nav-link mt-1'>Cerrar sesión</NavLink>
                </Nav>

                <DropdownButton
                    align={'end'}
                    variant="outline-secondary"
                    id="input-group-dropdown-1"
                    >
                    <Dropdown.Item><NavLink className='nav-link' style={{color: 'whitesmoke'}} onClick={() => dispatch(setActiveUser())} to = '/Profile'>{(activeUser?.urlImage) ? <img src={activeUser?.urlImage} className='img-fluid rounded-circle' style = {{width: '20px', height: '20px', cursor: 'pointer', margin: 0}} alt='' /> : <i className="bi bi-person-circle" style = {{cursor: 'pointer', color: 'white', margin: 0}}></i>} Perfil</NavLink></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item><NavLink style={{color: 'whitesmoke'}} to = '/Login' onClick = {handledLogout} className = 'nav-link'>Cerrar sesión</NavLink></Dropdown.Item>
                </DropdownButton>

            </Container>
        </Navbar>
    )
}
