import { fetchConToken, fetchSinToken } from "../helper/fetch"
import { Types } from "../types/Types"
import Swal from "sweetalert2"



export const startGetPetitions = () => {
    return async(dispatch) => {
        const resp = await fetchSinToken('peticion')
        const body = await resp.json()

        console.log(body)

        if(body.ok) {
            dispatch(Petitions(body.peticiones))
        }
    }
}

const Petitions = (peticiones) => ({
    type: Types.ptgetPetitions,
    payload: peticiones
})

export const startCreatePetition = (title, date, descripcion) => {
    return async(dispatch) => {

        const resp = await fetchConToken('peticion', {title, date, descripcion}, 'POST');
        const body = await resp.json()

        dispatch(createPetition(body))
        Swal.fire('Exito', 'Mini Serie creada exitosamente', 'success');
        
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

export const clearSetActivePetition = () => ({
    type: Types.ptClearSetPetition
});


export const startUpdatePetition = (title, date, descripcion) => {
    return async(dispatch, getState) => {

        const {activePetitions} = getState().pt

        
        const resp = await fetchConToken(`peticion/${activePetitions._id}`, {title, date, descripcion}, 'PUT');
        const body = await resp.json()

        if (body.ok) {

            dispatch(updatePetition(activePetitions))
            Swal.fire('Exito', 'Usuario actualizado exitosamente', 'success')
        } else {
            console.log(body.errors)
            Swal.fire('Error', body.errors, 'error')
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

        if(resp.ok) {
            dispatch(deletePetition(activePetitions))
        }
    }

}

const deletePetition = (peticiones) => ({
    type: Types.ptDeletePetition,
    payload: peticiones
})