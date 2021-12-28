import { fetchConToken, fetchSinToken } from "../helper/fetch"
import {Types} from '../types/Types';
import Swal from 'sweetalert2'


export const startLogin = (email, password) => {
    return async(dispatch) => {
        const resp = await fetchSinToken('auth', {email, password}, 'POST');
        const body = await resp.json();
        
        if(body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}


export const startRegister = (name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password) => {
    return async(dispatch) => {
        const resp = await fetchConToken('auth/new', {name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password}, 'POST');
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
                biliever: false,
                discipleship: false,
                tracking: false,
                password: body?.password
            }))
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 10000,
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
                timer: 10000,
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
        }

        console.log(body)
    }
}

const getUsers = (users) => ({
    type: Types.authStartGetUsers,
    payload: users
})

export const startUpdateUser = (name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password) => {
    return async(dispatch, getState) => {
        const {SetUser} = getState().us
        
            const user = SetUser
            const resp = await fetchConToken(`auth/update/${user.id}`, {name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password}, 'PUT')
            const body = await resp.json()

        if(body.ok) {
            dispatch(updateUser(user))
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 10000,
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
                timer: 10000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              return Toast.fire({
                icon: 'error',
                title: `${body.errors.email.msg}`
              })
        }
    }
}

const updateUser = (user) => ({
    type: Types.authStartUpdateUser,
    payload: user
})

export const ActiverUser = (user) => ({
    type: Types.authSetUser,
    payload: user
})

export const startDeleteUser = (user) => {
     console.log(user)
    return async(dispatch) => {
        const resp = await fetchConToken(`auth/delete/${user.id}`, user, 'DELETE')
        const body = await resp.json()

        if(body.ok) {
            dispatch(deleteUser(user))
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 10000,
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
    }
}

const logout = () => ({
    type: Types.authLogout
})