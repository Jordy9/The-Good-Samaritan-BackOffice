import { useEffect, useState } from 'react'
import { Container, Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { setActiveUser, setNotificationsPost, startLogout } from '../../action/auth'
import logo from '../../heroes/logo.png'
import { Sidebar } from '../sidebar/Sidebar'
import moment from 'moment'
import './Navb.css'
import { UpdateNotifications } from '../../action/notificationsAdmin'


export const Navb = () => {
    const dispatch = useDispatch()

    const {activeUser, uid} = useSelector(state => state.auth)

    const {socket} = useSelector(state => state.sk)

    const {notificaciones: notificacionesAdmin, updateNotifications} = useSelector(state => state.nu)

    const handledLogout = () => {
      dispatch(startLogout())
    }

    useEffect(() => {

      if (notificacionesAdmin && notificacionesAdmin[0]?.users?.filter(not => not === uid)?.length !== 0) {
        dispatch(UpdateNotifications(false))
      }

      if (notificacionesAdmin && notificacionesAdmin[0]?.users?.filter(not => not === uid)?.length === 0) {
        dispatch(UpdateNotifications(true))
      }
    }, [dispatch, notificacionesAdmin, uid])

    useEffect(() => {

      let isMountede = true
      socket?.on('notifications-admin', () => {

        if (isMountede) {
          dispatch(UpdateNotifications(true))
        }
      })

      return () => {
        isMountede = false
      }
    }, [socket, dispatch, uid])

    const onClick = () => {
      if (notificacionesAdmin?.length !== 0) {
        socket?.emit('Delete-Notifications-count-admin', uid)
        dispatch(UpdateNotifications(false))
      }
    }

    const {pathname} = useLocation()

    const history = useHistory()

    const [width, setWidth] = useState(window.innerWidth);

    const changeWidth = () => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', changeWidth)
        if (pathname === '/NotificationResponsive' && width > 991) {
            history.push('/Dashboard')
        }
        return () => window.removeEventListener('resize', changeWidth)
        
    }, [pathname, width, history]);

    const setNotify = (noti) => {
        dispatch(setNotificationsPost(noti))
        history.push(`/NotificationPost/${noti._id}`)
    }

    useEffect(() => {
        if (activeUser?.role === 'Administrador') {

            if (pathname === '/MiniSerie' || pathname === '/MiniSeriesList') {
              history.push('/Dashboard')
            }
      
            if (pathname === '/Sketch' || pathname === '/SketchsList') {
              history.push('/Dashboard')
            }
      
            if (pathname === '/Capsule' || pathname === '/CapsulesList') {
              history.push('/Dashboard')
            }
      
            if (pathname === '/Petition') {
              history.push('/Dashboard')
            }
        }
      }, [pathname, history, activeUser])

    useEffect(() => {
        if (activeUser?.role === 'Gestorcontenido') {

            if (pathname === '/MiniSerie' || pathname === '/MiniSeriesList') {
              history.push('/Dashboard')
            }
      
            if (pathname === '/Sketch' || pathname === '/SketchsList') {
              history.push('/Dashboard')
            }
      
            if (pathname === '/Capsule' || pathname === '/CapsulesList') {
              history.push('/Dashboard')
            }
    
            if (pathname === '/ContactList') {
                history.push('/Dashboard')
            }
    
            if (pathname === '/Petition' || pathname === '/PetitionsList') {
                history.push('/Dashboard')
            }
            
            if (pathname === '/PetitionsListUser' || pathname === '/PetitionsListwhithoutAccount') {
                history.push('/Dashboard')
            }
        }
      }, [pathname, history, activeUser])

      useEffect(() => {

        if (activeUser?.role === 'Colaborador') {

            if (pathname === '/Dashboard') {
              history.push('/PetitionsList')
            }
      
            if (pathname === '/Petition') {
              history.push('/PetitionsList')
            }
      
            if (pathname === '/WordOfTheDay' || pathname === '/WordOfTheDayList') {
              history.push('/PetitionsList')
            }
      
            if (pathname === '/Event' || pathname === '/EventsList') {
              history.push('/PetitionsList')
            }
      
            if (pathname === '/LivesZoom') {
              history.push('/PetitionsList')
            }
      
            if (pathname === '/Main' || pathname === '/MainList' || pathname === '/imageVideo') {
              history.push('/PetitionsList')
            }
      
            if (pathname === '/Gallery-images' || pathname === '/GalleryList') {
              history.push('/PetitionsList')
            }
      
            if (pathname === '/LinkYoutube' || pathname === '/YoutubeList') {
              history.push('/PetitionsList')
            }
      
            if (pathname === '/NoBeleaver') {
              history.push('/PetitionsList')
            }
      
            if (pathname === '/Beleaver' || pathname === '/BeleaverList') {
              history.push('/PetitionsList')
            }
      
            if (pathname === '/MiniSerie' || pathname === '/MiniSeriesList') {
              history.push('/PetitionsList')
            }
      
            if (pathname === '/Sketch' || pathname === '/SketchsList') {
              history.push('/PetitionsList')
            }
      
            if (pathname === '/Capsule' || pathname === '/CapsulesList') {
              history.push('/PetitionsList')
            }
        }
      }, [pathname, history, activeUser])

      useEffect(() => {

        if (activeUser?.role === 'Pastor') {

            if (pathname === '/ContactList') {
                history.push('/Dashboard')
              }
        
              if (pathname === 'PetitionsListUser' || pathname === 'PetitionsListwhithoutAccount') {
                history.push('/Dashboard')
              }
        
              if (pathname === '/WordOfTheDay' || pathname === '/WordOfTheDayList') {
                history.push('/Dashboard')
              }
        
              if (pathname === '/Event' || pathname === '/EventsList') {
                history.push('/Dashboard')
              }
        
              if (pathname === '/LivesZoom') {
                history.push('/Dashboard')
              }
        
              if (pathname === '/Main' || pathname === '/MainList' || pathname === '/imageVideo') {
                history.push('/Dashboard')
              }
        
              if (pathname === '/Gallery-images' || pathname === '/GalleryList') {
                history.push('/Dashboard')
              }
        
              if (pathname === '/LinkYoutube' || pathname === '/YoutubeList') {
                history.push('/Dashboard')
              }
        
              if (pathname === '/NoBeleaver') {
                history.push('/Dashboard')
              }
        
              if (pathname === '/Beleaver' || pathname === '/BeleaverList') {
                history.push('/Dashboard')
              }
        }
        }, [pathname, history, activeUser])

        const {notificaciones} = useSelector(state => state.nt)
        
        const [changeColor, setChangeColor] = useState(false);

        useEffect(() => {
          if (notificaciones.filter(not => not.to === uid).length !== 0) {
              notificaciones?.map(notificaciones => (notificaciones.to === uid && notificaciones.length !== 0) && setChangeColor(true))
          } else {
              setChangeColor(false)
          }    
      }, [notificaciones, pathname, uid]);

    return (
        <Navbar className = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12' expand="lg" bg = 'dark' variant="dark">
            <Container fluid>
            <Sidebar />
                <Navbar.Brand style = {{cursor: 'pointer', margin: 0, padding: 0}} >
                    <span className = 'Navb-tittle d-flex justify-content-end align-items-center'>
                        <img id='logo-logo' src={logo} className='img-fluid' style={{width: 'auto', height: '40px', marginLeft: '60px'}} alt="" />
                        <NavLink id='title-logo' style = {{textDecoration: 'none', color: 'white'}} to = '/Dashboard'>Centro Cristiano El Buen Samaritano</NavLink>
                    </span>
                </Navbar.Brand>

                <Nav className="mx-auto">

                </Nav>

                {
                  (activeUser?.role === 'Administrador' || activeUser?.role === 'Colaborador')
                    &&
                  <Nav className="mr-3">
                    <NavLink to = '/Chat' className = 'nav-link' activeStyle={{color: 'white'}} activeClassName = 'true'><i className="bi bi-chat-text-fill" style={{color: (changeColor) && 'red'}}> </i>Chat</NavLink>
                  </Nav>
                }

                {
                    (activeUser?.role === 'Administrador' || activeUser?.role === 'Colaborador')
                        &&    
                    <Nav id="input-group-dropdown-responsive">
                        <NavLink
                            style={{textDecoration: 'none', color: 'white'}}
                            to = '/NotificationResponsive'
                            className='mr-2 d-flex align-items-center'
                        >
                            <i onClick={onClick} style={{fontSize: '20px', cursor: 'pointer', margin: 0}} className="bi bi-bell d-flex align-items-center">
                                <span style={{margin: 0}} className={`${(updateNotifications === true) && 'p-1 bg-danger border border-light rounded-circle'}`}></span>
                            </i>
                        </NavLink>
                    </Nav>
                }

                {
                    (activeUser?.role === 'Administrador' || activeUser?.role === 'Colaborador')
                        &&
                    <DropdownButton
                    className='mr-2 d-flex align-items-center'
                    title = {
                        <i onClick={onClick} style={{fontSize: '20px', cursor: 'pointer', margin: 0}} className="bi bi-bell d-flex align-items-center">
                            <span style={{margin: 0}} className={`${(updateNotifications === true) && 'p-1 bg-danger border border-light rounded-circle'}`}></span>
                        </i>}
                    align={'end'}
                    variant="dark"
                    id="input-group-dropdown-2"
                    >
                        <div style={{overflowY: 'scroll', height: '400px'}}>
                            {
                                notificacionesAdmin?.map((notifications, index) => {
                                    return (
                                        <Dropdown.Item onClick={() => setNotify(notifications)} className='shadow my-2 bg-dark p-3 flex-column' key={notifications+ index} style={{width: 'auto', height: 'auto'}}>
                                            <h6 className='text-white text-center'>{notifications.subtitle}</h6>
                                            <div className="row">
                                                {
                                                    (notifications.image)
                                                        ?
                                                    <>
                                                        <div className="col-8">
                                                            <h5 className='text-white'>
                                                                {
                                                                (notifications.title.length > 15)
                                                                    ?
                                                                    notifications.title.slice(0, 15) + '...'
                                                                    :
                                                                notifications.title
                                                                }
                                                            </h5>
                                                        </div>
                                                    
                                                        <div className="col-4 d-flex justify-content-end">
                                                            <img className='img-fluid' style={{width: '50px', height: 'auto'}} src={notifications.image} alt="" />    
                                                        </div>
                                                    </>
                                                    :
                                                    <div className="col-12">
                                                        <h4 className='text-white'>
                                                            {
                                                                notifications.title
                                                            }
                                                        </h4>
                                                    </div>
                                                }
                                            </div>
                                            <span style={{fontSize: '14px'}} className='text-white'>{moment(notifications.createdAt).fromNow()}</span>
                                        </Dropdown.Item>
                                    )
                                })
                            }
                        </div>
                    </DropdownButton>
                }


                <Nav id='nav-hidden-right'>
                    <NavLink onClick={() => dispatch(setActiveUser())} to = '/Profile'>{(activeUser?.urlImage) ? <img src={activeUser?.urlImage} className='img-fluid rounded-circle mt-2' style = {{width: '32px', height: '32px', cursor: 'pointer', margin: 0}} alt='' /> : <i className="bi bi-person-circle" style = {{fontSize: '32px', cursor: 'pointer', color: 'white', margin: 0}}></i>}</NavLink>
                    <NavLink to = '/Login' onClick = {handledLogout} className = 'nav-link mt-1'>Cerrar sesi??n</NavLink>
                </Nav>

                <DropdownButton
                    title = ''
                    align={'end'}
                    variant="outline-secondary"
                    id="input-group-dropdown-1"
                    >
                    <Dropdown.Item><NavLink className='nav-link' style={{color: 'whitesmoke'}} onClick={() => dispatch(setActiveUser())} to = '/Profile'>{(activeUser?.urlImage) ? <img src={activeUser?.urlImage} className='img-fluid rounded-circle' style = {{width: '20px', height: '20px', cursor: 'pointer', margin: 0}} alt='' /> : <i className="bi bi-person-circle" style = {{cursor: 'pointer', color: 'white', margin: 0}}></i>} Perfil</NavLink></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item><NavLink style={{color: 'whitesmoke'}} to = '/Login' onClick = {handledLogout} className = 'nav-link'>Cerrar sesi??n</NavLink></Dropdown.Item>
                </DropdownButton>

            </Container>
        </Navbar>
    )
}
