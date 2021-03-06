import { fetchConToken, fetchSinToken } from "../helper/fetch"
import { Types } from "../types/Types"
import Swal from "sweetalert2"

export const startGetPaginatePetitions = (page) => {
    return async(dispatch) => {
        const resp = await fetchSinToken(`peticion/pet?page=${page || 1}`)
        const body = await resp.json()

        if(body.ok) {
            dispatch(Petitions(body.peticiones))
            dispatch(PaginatePetitions({
                page: body.page,
                total: body.total
            }))
        }
    }
}

const PaginatePetitions = (peticiones) => ({
    type: Types.ptPaginatePetition,
    payload: peticiones
})

const Petitions = (peticiones) => ({
    type: Types.ptgetPetitions,
    payload: peticiones
})

export const startGetPaginatePetitionUser = (page) => {
    return async(dispatch) => {
        const resp = await fetchSinToken(`peticionesUser/pet?page=${page || 1}`)
        const body = await resp.json()

        if(body.ok) {
            dispatch(PetitionesUser(body.peticionesUser))
            dispatch(PaginatePetitionUser({
                page: body.page,
                total: body.total
            }))
        }
    }
}

const PaginatePetitionUser = (peticiones) => ({
    type: Types.ptPaginatePetitionUser,
    payload: peticiones
})

const PetitionesUser = (peticiones) => ({
    type: Types.ptgetPetitionesUser,
    payload: peticiones
})

export const startGetPaginatePetitionSinCuenta = (page) => {
    return async(dispatch) => {
        const resp = await fetchSinToken(`peticionSinCuenta/pet?page=${page || 1}`)
        const body = await resp.json()

        if(body.ok) {
            dispatch(PetitionSinCuenta(body.peticiones))
            dispatch(PaginatePetitionSinCuenta({
                page: body.page,
                total: body.total
            }))
        }
    }
}

const PaginatePetitionSinCuenta = (peticiones) => ({
    type: Types.ptPaginatePetitionSinCuenta,
    payload: peticiones
})

const PetitionSinCuenta = (peticiones) => ({
    type: Types.ptgetPetitionSinCuenta,
    payload: peticiones
})

export const startCreatePetition = (title, descripcion, name, number) => {
    return async(dispatch, getState) => {

        const {socket} = getState().sk

        const resp = await fetchConToken('peticion', {title, descripcion, name, number}, 'POST');
        const body = await resp.json()

        dispatch(createPetition(body))
        // const subtitle = 'Nueva petici??n de oraci??n de pastores agregada'

        // const payload = {title, subtitle}

        // socket?.emit('notifications-admin-to-user', payload)

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
            title: 'Petici??n creada correctamente'
          })
        
    }
}

const createPetition = (peticiones) => ({
    type: Types.ptcreatePetition,
    payload: peticiones
})

export const SetActivePetition = (peticiones) => ({
    type: Types.ptSetPetition,
    payload: peticiones
});

export const SetActivePetitionesUser = (peticiones) => ({
    type: Types.ptSetPetitionesUser,
    payload: peticiones
});

export const SetActivePetitionSinCuenta = (peticiones) => ({
    type: Types.ptSetPetitionSinCuenta,
    payload: peticiones
});

export const clearSetActivePetition = () => ({
    type: Types.ptClearSetPetition
});


export const startUpdatePetition = (title, descripcion) => {
    return async(dispatch, getState) => {

        const {activePetitions} = getState().pt

        
        const resp = await fetchConToken(`peticion/${activePetitions._id}`, {title, descripcion}, 'PUT');
        const body = await resp.json()

        if (body.ok) {

            dispatch(updatePetition(body.peticion))
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
                title: 'Petici??n actualizada correctamente'
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

const updatePetition = (peticiones) => ({
    type: Types.ptUpdatePetition,
    payload: peticiones
})


export const startDeletePetition = () => {
    return async(dispatch, getState) => {
        const {activePetitions} = getState().pt

        const resp = await fetchConToken(`peticion/${activePetitions._id}`, activePetitions, 'DELETE')
        const body = await resp.json()

        if(body.ok) {
            dispatch(deletePetition(activePetitions))
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
                title: 'Petici??n eliminada correctamente'
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

const deletePetition = (peticiones) => ({
    type: Types.ptDeletePetition,
    payload: peticiones
})

export const startDeletePetitionesUser = () => {
    return async(dispatch, getState) => {
        const {activePetitionesUser} = getState().pt

        const {socket} = getState().sk

        const resp = await fetchConToken(`peticionesUser/${activePetitionesUser._id}`, activePetitionesUser, 'DELETE')
        const body = await resp.json()

        if(body.ok) {
            dispatch(deletePetitionesUser(activePetitionesUser))
            socket?.emit('notifications-user-to-admin-delete', activePetitionesUser._id)
            
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
                title: 'Petici??n eliminada correctamente'
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

const deletePetitionesUser = (peticiones) => ({
    type: Types.ptDeletePetitionesUser,
    payload: peticiones
})

export const startDeletePetitionSinCuenta = () => {
    return async(dispatch, getState) => {
        const {activePetitionSinCuenta} = getState().pt

        const {socket} = getState().sk

        const resp = await fetchConToken(`peticionSinCuenta/${activePetitionSinCuenta._id}`, activePetitionSinCuenta, 'DELETE')

        if(resp.ok) {
            dispatch(deletePetitionSinCuenta(activePetitionSinCuenta))
            socket?.emit('notifications-user-to-admin-delete', activePetitionSinCuenta._id)
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
                title: 'Petici??n eliminada correctamente'
              })
        }
    }

}

const deletePetitionSinCuenta = (peticiones) => ({
    type: Types.ptDeletePetitionSinCuenta,
    payload: peticiones
})

export const cargarPeticiones = (petition) => ({
    type: Types.ptCargarPeticionesUser,
    payload: petition
})

export const cargarPeticionesSinCuenta = (petition) => ({
    type: Types.ptCargarPeticionesSinCuenta,
    payload: petition
})

export const cargarPeticionesPastores = (petition) => ({
    type: Types.ptCargarPeticionesPastores,
    payload: petition
})