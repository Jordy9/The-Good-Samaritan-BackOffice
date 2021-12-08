import { fetchConToken, fetchSinToken, fetchUploadImage } from "../helper/fetch"
import axios from 'axios'
import { Types } from "../types/Types"
import Swal from "sweetalert2"



export const startGetMiniSeries = () => {
    return async(dispatch) => {
        const resp = await fetchSinToken('miniserie')
        const body = await resp.json()

        if(body.ok) {
            dispatch(miniSeries(body.miniSeries))
        }
    }
}

const miniSeries = (series) => ({
    type: Types.migetSeries,
    payload: series
})

export const startCreateMiniSerie = (title, date, descripcion, file) => {
    return async(dispatch) => {

        const token = localStorage.getItem('token') || '';

            const formData = new FormData()
            formData.append('file', file)
            formData.append('title', title)

            const res = await axios.post('http://localhost:4000/api/image/upload', formData, {headers: {'x-token': token}})

            console.log(res)

            
            if(res.data.ok) {
                const image = res.data.image.url
                const idImage = res.data.image.id
                const resp = await fetchConToken('miniSerie', {title, date, image, idImage, descripcion}, 'POST');
                const body = await resp.json()

                console.log(body)
                
            }
    }
}

export const SetActiveSerie = (serie) => ({
    type: Types.miSetSerie,
    payload: serie
});

export const clearSetActiveSerie = () => ({
    type: Types.miClearSetSerie
});


export const startUpdateSerie = (title, date, descripcion, fileupload) => {
    return async(dispatch, getState) => {

        const {activeSerie} = getState().mi

        const token = localStorage.getItem('token') || '';

            const ress = await axios.delete(`http://localhost:4000/api/image/upload/${activeSerie.idImage}`, {headers: {'x-token': token}})

            if (ress.data.ok) {

                const formData = new FormData()
                formData.append('file', fileupload)
                formData.append('title', activeSerie.title)
    
                const res = await axios.post('http://localhost:4000/api/image/upload', formData, {headers: {'x-token': token}})
    
                console.log(res)
    
            // 
            // 
            
                // const resp = await fetchConToken(`miniSerie/update/${serie.id}`, serie, 'PUT')
                // const body = await resp.json()
    
                if(res.data.ok) {
                    const image = res.data.image.url
                    const idImage = res.data.image.id
                    const resp = await fetchConToken(`miniSerie/${activeSerie._id}`, {title, date, image, idImage, descripcion}, 'PUT');
                    const body = await resp.json()
    
                    if (body.ok) {
    
                        dispatch(updateSerie(activeSerie))
                        Swal.fire('Exito', 'Usuario actualizado exitosamente', 'success')
                    }
            
                } else {
                    console.log(res.errors)
                    Swal.fire('Error', res.errors, 'error')
                }
            } else {
                Swal.fire('Error', ress.errors, 'error')
            }

    }
}

const updateSerie = (user) => ({
    type: Types.miUpdateSerie,
    payload: user
})


export const startDeleteSerie = () => {
    return async(dispatch, getState) => {
        const {activeSerie} = getState().mi

        const token = localStorage.getItem('token') || '';

        if(activeSerie.idImage) {
            await axios.delete(`http://localhost:4000/api/image/upload/${activeSerie.idImage}`, {headers: {'x-token': token}})

            const resp = await fetchConToken(`miniSerie/${activeSerie._id}`, activeSerie, 'DELETE')
    
            if(resp.ok) {
                dispatch(deleteSerie(activeSerie))
            }
        } else {
            const resp = await fetchConToken(`miniSerie/${activeSerie._id}`, activeSerie, 'DELETE')
    
            if(resp.ok) {
                dispatch(deleteSerie(activeSerie))
            }
        }

    }
}

const deleteSerie = (user) => ({
    type: Types.miDeleteSerie,
    payload: user
})