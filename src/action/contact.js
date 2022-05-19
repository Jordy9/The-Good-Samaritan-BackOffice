import { fetchConToken, fetchSinToken } from "../helper/fetch"
import { Types } from "../types/Types"
import Swal from "sweetalert2"

export const startGetPaginateContact = (page) => {
    return async(dispatch) => {
        const resp = await fetchSinToken(`contact/con?page=${page || 1}`)
        const body = await resp.json()

        if(body.ok) {
            dispatch(Contacts(body.contactos))
            dispatch(PaginateContact({
                page: body.page,
                total: body.total
            }))
        }
    }
}

const PaginateContact = (contactos) => ({
    type: Types.coPaginateContact,
    payload: contactos
})

const Contacts = (contactos) => ({
    type: Types.cogetContacts,
    payload: contactos
})

export const startCreateContact = (subject, title, descripcion) => {
    return async(dispatch, getState) => {
        
        const {activeContact} = getState().co

        const email = 'ccbsrd@gmail.com'

        const email2 = activeContact?.email

        const resp = await fetchConToken('sendEmail', {subject, title, email2, descripcion, email}, 'POST');
        const body = await resp.json()
        
        if (resp.ok) {
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
                title: 'Eviado correctamente'
              })
        }
        
    }
}

export const startCreatePostContact = (subject, title, descripcion) => {
    return async(dispatch, getState) => {
        
        const {notificationPost} = getState().auth
        const email = 'ccbsrd@gmail.com'

        const email2 = notificationPost?.content?.email

        const resp = await fetchConToken('sendEmail', {subject, title, email2, descripcion, email}, 'POST');
        const body = await resp.json()
        
        if (resp.ok) {
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
                title: 'Eviado correctamente'
              })
        }
        
    }
}

export const SetActiveContact = (Contacts) => ({
    type: Types.coSetContact,
    payload: Contacts
});


export const startDeleteContact = () => {
    return async(dispatch, getState) => {
      
        const {socket} = getState().sk

        const {activeContact} = getState().co

        const resp = await fetchConToken(`contact/${activeContact._id}`, activeContact, 'DELETE')
        const body = await resp.json()

        if(body.ok) {
            dispatch(deleteContact(activeContact))
            socket?.emit('notifications-user-to-admin-delete', activeContact._id)
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
                title: 'Contacto eliminado correctamente'
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
                title: body.msg
              })
        }
    }

}

const deleteContact = (Contacts) => ({
    type: Types.coDeleteContact,
    payload: Contacts
})

export const cargarContactos = (Contacts) => ({
    type: Types.coCargarContact,
    payload: Contacts
})

// export const SendContactEmail = () => {
//     return async(dispatch, getState) => {

//         const {users} = getState().auth

//         const descripcion = 'Revisa el listado de contactos, ha llegado uno nuevo.'
//         const subject = `Nueva solicitud de información de contácto`
//         const title = 'solicitud de información de contácto'
//         const us = users[Math.floor(Math.random() * users.length + 1)];
//         const email2 = us?.email


//         const email = 'ccbsrd@gmail.com'

//         const resp = await fetchConToken('sendEmail', {subject, title, email2, descripcion, email}, 'POST');
//         await resp.json()
//     }
// }