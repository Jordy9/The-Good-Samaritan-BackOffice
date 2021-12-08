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


export const startRegister = (name, lastName, email, password) => {
    return async(dispatch) => {
        const resp = await fetchConToken('auth/new', {name, lastName, email, password}, 'POST');
        const body = await resp.json();

        if(body.ok) {
            dispatch(register({
                name: body.name,
                lastName: body.lastName,
                email: body.email,
                password: body.password
            }))
            Swal.fire('Exito', body.msg, 'success')
        }
    }
}

const register = (user) => ({
    type: Types.authStartRegister,
    payload: user
})


export const startGetUsers = (name, lastName, email, password) => {
    return async(dispatch) => {
        const resp = await fetchConToken('auth');
        const body = await resp.json()

        if(body.ok) {
            dispatch(getUsers(body.users))
        }
    }
}

const getUsers = (users) => ({
    type: Types.authStartGetUsers,
    payload: users
})


export const SetActive = (user) => ({
    type: Types.authSetUser,
    payload: user
});

export const clearSetActive = () => ({
    type: Types.authClearSetUser
});


export const startUpdateUser = (user) => {
    console.log(user.id)
    return async(dispatch) => {
            const resp = await fetchConToken(`auth/update/${user.id}`, user, 'PUT')
            const body = await resp.json()

        if(body.ok) {
            dispatch(updateUser(user))
            Swal.fire('Exito', 'Usuario actualizado exitosamente', 'success')
        } else {
            console.log(body.errors)
            Swal.fire('Error', body.errors, 'error')
        }
    }
}

const updateUser = (user) => ({
    type: Types.authStartUpdateUser,
    payload: user
})



export const startDeleteUser = (user) => {
    return async(dispatch) => {
        const resp = await fetchConToken(`auth/delete/${user.id}`, user, 'DELETE')
        const body = await resp.json()

        if(body.ok) {
            dispatch(deleteUser(user))
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