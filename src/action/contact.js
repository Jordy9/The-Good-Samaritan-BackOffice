import { fetchConToken, fetchSinToken } from "../helper/fetch"
import { Types } from "../types/Types"
import Swal from "sweetalert2"


export const startGetContact = () => {
    return async(dispatch) => {
        const resp = await fetchSinToken('contact')
        const body = await resp.json()

        console.log(body)

        if(body.ok) {
            dispatch(Contacts(body.contactos))
        }
    }
}

const Contacts = (contactos) => ({
    type: Types.cogetContacts,
    payload: contactos
})

export const startCreateContact = (subject, title, descripcion) => {
    return async(dispatch, getState) => {
        
        const {activeContact} = getState().co 
        const {users} = getState().auth
        const {uid} = getState().auth
        const user = users.find(user => user.id === uid)
        const email = user.email

        const email2 = activeContact.email

        const resp = await fetchConToken('sendEmail', {subject, title, email2, descripcion, email}, 'POST');
        const body = await resp.json()
        
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
            title: 'Eviado correctamente'
          })
        
    }
}

export const SetActiveContact = (Contacts) => ({
    type: Types.coSetContact,
    payload: Contacts
});


export const startDeleteContact = () => {
    return async(dispatch, getState) => {
        const {activePetitions} = getState().pt

        const resp = await fetchConToken(`contact/${activePetitions._id}`, activePetitions, 'DELETE')

        if(resp.ok) {
            dispatch(deleteContact(activePetitions))
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
                title: 'Contacto eliminado correctamente'
              })
        }
    }

}

const deleteContact = (Contacts) => ({
    type: Types.coDeleteContact,
    payload: Contacts
})