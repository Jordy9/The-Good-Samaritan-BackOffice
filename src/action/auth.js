import { fetchConToken, fetchSinToken } from "../helper/fetch"
import {Types} from '../types/Types';
import Swal from 'sweetalert2'
import axios from "axios";
import { clearChat } from "./chat";
import moment from "moment";


export const startLogin = (email, password) => {
    return async(dispatch) => {
        const greeting = moment().hour()
        let greet
        if (greeting >= 0 && greeting <= 11) {
            greet = '🌄 Buenos días'
        } else if (greeting >= 12 && greeting <= 18) {
            greet = '☀️ Buenas tardes'
        } else if (greeting >= 19 && greeting <= 23) {
            greet = '🌙 Buenas noches'
        }
        const resp = await fetchSinToken('auth', {email, password}, 'POST');
        const body = await resp.json();
        
        if(body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            await dispatch(login({
                uid: body.uid,
                name: body.name
            }))
            dispatch(setActiveUser())

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              return Toast.fire({
                title: `${greet} ${body.name}`
              })             
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              return Toast.fire({
                icon: 'error',
                title: `${body.msg}`
              })
        }
    }
}


export const startRegister = (name, lastName, age, date, email, role, address, country, city, number, password) => {
    return async(dispatch, getState) => {
        const {activeUser} = getState().auth

        const resp = await fetchConToken('auth/new', {name, lastName, age, date, email, role, address, country, city, number, password, activeUser}, 'POST');
        const body = await resp.json();

        if(body.ok) {
            dispatch(register(body.user))
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              return Toast.fire({
                icon: 'success',
                title: 'Usuario creado exitosamente'
              })
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              return Toast.fire({
                icon: 'error',
                title: `${body.msg}`
              })
        }
    }
}

const register = (user) => ({
    type: Types.authStartRegister,
    payload: user
})

export const startGetUsers = () => {
    return async(dispatch) => {
        const resp = await fetchConToken('auth');
        const body = await resp.json()

        if(body.ok) {
            dispatch(getUsers(body.users))
            dispatch(setActiveUser(body.users))
            dispatch(paginateuser({
                page: body.page,
                total: body.total
            }))
        }
    }
}

const paginateuser = (paginate) => ({
    type: Types.authPaginateUser,
    payload: paginate
})

const getUsers = (users) => ({
    type: Types.authStartGetUsers,
    payload: users
})

export const startUpdateUser = (name, lastName, age, date, email, role, address, country, city, number, password) => {
    return async(dispatch, getState) => {
        const {SetUser} = getState().us
        const {activeUser} = getState().auth
        
            const user = SetUser
            const resp = await fetchConToken(`auth/update/${user.id}`, {name, lastName, age, date, email, role, address, country, city, number, password, activeUser}, 'PUT')
            const body = await resp.json()

        if(body.ok) {
            dispatch(updateUser(body.usuario))
            dispatch(setActiveUser(body.usuario))
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              return Toast.fire({
                icon: 'success',
                title: 'Usuario actualizado correctamente'
              })
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              return Toast.fire({
                icon: 'error',
                title: `${body.msg}`
              })
        }
    }
}

export const startUpdateUserUsuario = (name, lastName, date, email, address, country, city, number, biliever, discipleship, tracking, password) => {
    return async(dispatch, getState) => {
        const {SetUser} = getState().us
        
            const user = SetUser
            const resp = await fetchConToken(`users/update/${user.id}`, {name, lastName, date, email, address, country, city, number, biliever, discipleship, tracking, password}, 'PUT')
            const body = await resp.json()

        if(body.ok) {
            dispatch(setActiveUser(body.users))
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              return Toast.fire({
                icon: 'success',
                title: 'Usuario actualizado correctamente'
              })
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              return Toast.fire({
                icon: 'error',
                title: `${body.msg}`
              })
        }
    }
}

const updateUser = (user) => ({
    type: Types.authStartUpdateUser,
    payload: user
})

export const startUpdateUserAdmin = (name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password, file) => {
    return async(dispatch, getState) => {
        const {activeUser} = getState().auth
        
            const user = activeUser
            const token = localStorage.getItem('token') || '';

        if(file) {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('title', name)

            if (user?.urlImage) {
                
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload/perfil`, formData, {
                    headers: {'x-token': token},
                    onUploadProgress: (e) =>
                    {dispatch(upload(Math.round( (e.loaded * 100) / e.total )))}
                })
                
                if (res.data.ok) {
                    const urlImage = res.data.image.url
                    const idImage = res.data.image.id
                    
                    const resp = await fetchConToken(`auth/updateProfile/${user.id}`, {name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password, urlImage, idImage}, 'PUT')
                    const body = await resp.json()
                    
                    if(body.ok) {
                        dispatch(updateUserAdmin(body.usuario))
                        dispatch(setActiveUser(body.usuario))
                        dispatch(UploadFish())
                        const ress = await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${user.idImage}`, {headers: {'x-token': token}})
                        console.log(ress)
                        const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 5000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })
                        
                            return Toast.fire({
                                icon: 'success',
                                title: 'Usuario actualizado correctamente'
                            })
                        } else {
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 5000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })
                            
                            return Toast.fire({
                                icon: 'error',
                                title: `${body.msg}`
                            })
                        }
                    } else {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 5000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                        
                        return Toast.fire({
                            icon: 'error',
                            title: `${res.data.msg}`
                        })
                    }

            } else{
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload/perfil`, formData, {
                    headers: {'x-token': token},
                    onUploadProgress: (e) =>
                        {dispatch(upload(Math.round( (e.loaded * 100) / e.total )))}
                })
    
                if (res.data.ok) {
                    const urlImage = res.data.image.url
                    const idImage = res.data.image.id
                
                    const resp = await fetchConToken(`auth/updateProfile/${user.id}`, {name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password, urlImage, idImage}, 'PUT')
                    const body = await resp.json()

                    if(body.ok) {
                        dispatch(updateUserAdmin(body.usuario))
                        dispatch(setActiveUser(body.usuario))
                        dispatch(UploadFish())
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 5000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                    
                        return Toast.fire({
                            icon: 'success',
                            title: 'Usuario actualizado correctamente'
                        })
                    } else {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 5000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                        
                        return Toast.fire({
                            icon: 'error',
                            title: `${body.msg}`
                        })
                    }
                } else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 5000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    
                    return Toast.fire({
                        icon: 'error',
                        title: `${res.data.msg}`
                    })
                }
            }

            
        } else {
            const urlImage = user.urlImage
            const idImage = user.idImage
            const resp = await fetchConToken(`auth/updateProfile/${user.id}`, {name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password, urlImage, idImage}, 'PUT')
            const body = await resp.json()

            if(body.usuario) {
                dispatch(updateUserAdmin(body.usuario))
                dispatch(setActiveUser(body.usuario))
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                
                return Toast.fire({
                    icon: 'success',
                    title: 'Usuario actualizado correctamente'
                })
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                
                return Toast.fire({
                    icon: 'error',
                    title: `${body.msg}`
                })
            }
        }
    }
}

const UploadFish = () => ({
    type: Types.authUploadFinish
  })
  
  const upload = (progress) => ({
    type: Types.authUpload,
    payload: progress
  })

const updateUserAdmin = (user) => ({
    type: Types.authStartUpdateUserAdmin,
    payload: user
})

export const ActiverUser = (user) => ({
    type: Types.authSetUser,
    payload: user
})

export const startDeleteUser = (user) => {
    return async(dispatch, getState) => {

        const {activeUser} = getState().auth 

        let resp
        if (user?.role !== 'Usuario') {
            resp = await fetchConToken(`auth/delete/${user.id}`, activeUser, 'DELETE')
        } else {
            resp = await fetchConToken(`users/delete/${user.id}`, activeUser, 'DELETE')
        }

        const body = await resp.json()

        if(body.ok) {
            dispatch(deleteUser(user))
            dispatch(startGetUsersUsuarios())
            dispatch(startGetUsers())
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              return Toast.fire({
                icon: 'success',
                title: 'Usuario eliminado correctamente'
              })
        }
    }
}

export const startGetUsersUsuarios = () => {
    return async(dispatch) => {
        const resp = await fetchConToken('users');
        const body = await resp.json()

        if(body.ok) {
            dispatch(getUsersUsuarios(body.users))
        }
    }
}

const getUsersUsuarios = (user) => ({
    type: Types.authUserUsuariosget,
    payload: user
})

const deleteUser = (user) => ({
    type: Types.authStartDeleteUser,
    payload: user
})



export const startAuthCheking = () => {
    return async(dispatch) => {
        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();
        
        if(body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            dispatch(checkingFinish())

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            dispatch(startLogout)
            
            return Toast.fire({
                icon: 'error',
                title: body.msg
            })

        }
    }
}

const checkingFinish = () => ({
    type: Types.authCheckingFinish
})


const login = (user) => ({
    type: Types.authLogin,
    payload: user
})


export const startLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('token')
        localStorage.removeItem('token-init-date')
        dispatch(logout())
        dispatch(clearChat())
        dispatch(startGetUsers())
        dispatch(startGetUsersUsuarios())
    }
}

const logout = () => ({
    type: Types.authLogout
})

export const setActiveUser = () => {
    return async(dispatch, getState) => {

        const {uid, users} = getState().auth

        const user = users?.find(user => user.id === uid)

        dispatch(activeUser(user))
        
    }
}

const activeUser = (user) => ({
    type: Types.authSetUser,
    payload: user
})

export const ModalOpen = (state) => ({
    type: Types.authModalOpen,
    payload: state
})

export const ModalClose = (state) => ({
    type: Types.authModalClose,
    payload: state
})

export const ModalOpenCreate = (state) => ({
    type: Types.authModalOpenCreate,
    payload: state
})

export const ModalCloseCreate = (state) => ({
    type: Types.authModalCloseCreate,
    payload: state
})

export const NotificationPublicAdmin = (notification) => {
    return (dispatch, getState) => {

        const {activeUser} = getState().auth

        if (activeUser?.role === 'Administrador' || activeUser?.role === 'Colaborador') {

            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 5000,
                showCloseButton: true,
                background: '#292b2c',
                width: 380
            })
        
            return Toast.fire({
                color: 'white',
                html: `
                    <div class = 'row'>
                        <div class = 'col-12' style="display:flex;align-items: center"><h6>${notification?.subtitle}</h6></div>
                    </div>
                `
            })
        }
    }
}

export const forgotPassword = (email) => {
    return async(dispatch) => {
        const resp = await fetchSinToken('resetPasswordAdmin', {email}, 'POST')
        const body = await resp.json()

        localStorage.setItem('tokenn', body.token)
        localStorage.setItem('tokennINIT', (new Date().getTime()))

        if(body.ok) {

            dispatch(forgot(body.token))
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            
            return Toast.fire({
                icon: 'success',
                title: 'Revisa tu correo electrónico'
            })
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            
            return Toast.fire({
                icon: 'error',
                title: `${body.msg}`
            })
        }
    }
}

export const newPassword = (password) => {
    return async(dispatch, getState) => {

        const {users} = getState().auth

        const token = localStorage.getItem('tokenn')

        const tokenTiempo = localStorage.getItem('tokennINIT')

        if (moment(Number(tokenTiempo)).fromNow() === '10 minutes ago' || moment(Number(tokenTiempo)).fromNow() < '10 minutes ago') {
            localStorage.removeItem('tokenn')
            localStorage.removeItem('tokennINIT')
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
        
            return Toast.fire({
                icon: 'error',
                title: 'El tiempo para el cambio de contraseña expiró'
            })
        } else if (token && tokenTiempo) {
            const tokenVerify = users?.find(user => user.tokenUser === token)

            const {email} = tokenVerify

            const resp = await fetchSinToken('resetPasswordAdmin/newAdmin', {password, email}, 'POST')
            const body = await resp.json()

            if (body.ok) {
                localStorage.removeItem('tokenn')
                localStorage.removeItem('tokennINIT')
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
            
                return Toast.fire({
                    icon: 'success',
                    title: 'Contraseña guardada correctamente'
                })
            }
        }

    }
}

const forgot = (token) => ({
    type: Types.authForgotPassword,
    payload: token
})

export const setNotificationsPost = (notification) => ({
    type: Types.authsetNotificationPost,
    payload: notification
})