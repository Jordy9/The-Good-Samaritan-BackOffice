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


export const startRegister = (name, lastName, age, date, email, address, country, city, number, password) => {
    return async(dispatch) => {
        const resp = await fetchConToken('auth/new', {name, lastName, age, date, email, address, country, city, number, password}, 'POST');
        const body = await resp.json();

        if(body.ok) {
            dispatch(register({
                name: body?.name, 
                lastName: body?.last, 
                age: body?.age,
                date: body?.date,
                email: body?.email,
                address: body?.address,
                country: body?.country,
                city: body?.city,
                number: body?.number,
                password: body?.password
            }))
            await dispatch(setActiveUser(body.users))
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

export const startGetUsers = (page) => {
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

export const startUpdateUser = (name, lastName, age, date, email, address, country, city, number, password) => {
    return async(dispatch, getState) => {
        const {SetUser} = getState().us
        
            const user = SetUser
            const resp = await fetchConToken(`auth/update/${user.id}`, {name, lastName, age, date, email, address, country, city, number, password}, 'PUT')
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

export const startUpdateUserUsuario = (name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password) => {
    return async(dispatch, getState) => {
        const {SetUser} = getState().us
        
            const user = SetUser
            const resp = await fetchConToken(`users/update/${user.id}`, {name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password}, 'PUT')
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
                const ress = await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${user.idImage}`, {headers: {'x-token': token}})

                if (ress.data.ok) {

                    const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {headers: {'x-token': token}})
    
                    if (res.data.ok) {
                        const urlImage = res.data.image.url
                        const idImage = res.data.image.id
                    
                        const resp = await fetchConToken(`auth/update/${user.id}`, {name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password, urlImage, idImage}, 'PUT')
                        const body = await resp.json()
        
                        if(body.ok) {
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
                        title: `${ress.data.msg}`
                    })
                }

            } else{
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {headers: {'x-token': token}})
    
                if (res.data.ok) {
                    const urlImage = res.data.image.url
                    const idImage = res.data.image.id
                
                    const resp = await fetchConToken(`auth/update/${user.id}`, {name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password, urlImage, idImage}, 'PUT')
                    const body = await resp.json()

                    if(body.ok) {
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
            const resp = await fetchConToken(`auth/update/${user.id}`, {name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password, urlImage, idImage}, 'PUT')
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

const updateUserAdmin = (user) => ({
    type: Types.authStartUpdateUserAdmin,
    payload: user
})

export const ActiverUser = (user) => ({
    type: Types.authSetUser,
    payload: user
})

export const startDeleteUser = (user) => {
    return async(dispatch) => {
        console.log(user)
        let resp
        if (user?.biliever === undefined) {
            resp = await fetchConToken(`auth/delete/${user.id}`, user, 'DELETE')
        } else {
            resp = await fetchConToken(`users/delete/${user.id}`, user, 'DELETE')
        }

        const body = await resp.json()

        if(body.ok) {
            dispatch(deleteUser(user))
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