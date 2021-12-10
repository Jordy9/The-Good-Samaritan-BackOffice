import { fetchConToken, fetchSinToken } from "../helper/fetch"
import axios from 'axios'
import { Types } from "../types/Types"
import Swal from "sweetalert2"



export const startGetGallery = () => {
    return async(dispatch) => {
        const resp = await fetchSinToken('galeria')
        const body = await resp.json()

        if(body.ok) {
            dispatch(Gallerys(body.galeria))
        }
    }
}

const Gallerys = (galeria) => ({
    type: Types.gagetGallerys,
    payload: galeria
})

export const startCreateGallery = (title, file) => {
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
                const resp = await fetchConToken('galeria', {title, image, idImage}, 'POST');
                const body = await resp.json()

                dispatch(createGallery(body))

                console.log(body)
                Swal.fire('Exito', 'Mini Serie creada exitosamente', 'success');
                
            }
    }
}

const createGallery = (galeria) => ({
    type: Types.gacreateGallery,
    payload: galeria
})

export const SetActiveGallery = (galeria) => ({
    type: Types.gaSetGallery,
    payload: galeria
});

export const clearSetActiveGallery = () => ({
    type: Types.gaClearSetGallery
});


export const startUpdateGallery = (title, fileupload) => {
    return async(dispatch, getState) => {

        const {activeGallery} = getState().ga

        console.log(activeGallery)

        const token = localStorage.getItem('token') || '';

            if(fileupload) {
                const ress = await axios.delete(`http://localhost:4000/api/image/upload/${activeGallery.idImage}`, {headers: {'x-token': token}})

                if (ress.data.ok) {

                    const formData = new FormData()
                    formData.append('file', fileupload)
                    formData.append('title', activeGallery.title)
        
                    const res = await axios.post('http://localhost:4000/api/image/upload', formData, {headers: {'x-token': token}})
        
                    console.log(res)
        
                // 
                // 
                
                    // const resp = await fetchConToken(`miniSerie/update/${serie.id}`, serie, 'PUT')
                    // const body = await resp.json()
        
                    if(res.data.ok) {
                        const image = res.data.image.url
                        const idImage = res.data.image.id
                        const resp = await fetchConToken(`galeria/${activeGallery._id}`, {title, image, idImage}, 'PUT');
                        const body = await resp.json()
        
                        if (body.ok) {
        
                            dispatch(updateGallery(activeGallery))
                            Swal.fire('Exito', 'Usuario actualizado exitosamente', 'success')
                        }
                
                    } else {
                        console.log(res.errors)
                        Swal.fire('Error', res.errors, 'error')
                    }
                } else {
                    Swal.fire('Error', ress.errors, 'error')
                }
            } else {

                const {image, idImage} = activeGallery
                const resp = await fetchConToken(`galeria/${activeGallery._id}`, {title, image, idImage}, 'PUT');
                const body = await resp.json()

                if (body.ok) {

                    dispatch(updateGallery(activeGallery))
                    Swal.fire('Exito', 'Usuario actualizado exitosamente', 'success')
                }
            }

            

    }
}

const updateGallery = (galeria) => ({
    type: Types.gaUpdateGallery,
    payload: galeria
})


export const startDeleteGallery = () => {
    return async(dispatch, getState) => {
        const {activeGallery} = getState().ga

        const token = localStorage.getItem('token') || '';

        if(activeGallery.idImage) {
            await axios.delete(`http://localhost:4000/api/image/upload/${activeGallery.idImage}`, {headers: {'x-token': token}})

            const resp = await fetchConToken(`galeria/${activeGallery._id}`, activeGallery, 'DELETE')
    
            if(resp.ok) {
                dispatch(deleteGallery(activeGallery))
            }
        } else {
            const resp = await fetchConToken(`galeria/${activeGallery._id}`, activeGallery, 'DELETE')
    
            if(resp.ok) {
                dispatch(deleteGallery(activeGallery))
            }
        }

    }
}

const deleteGallery = (galeria) => ({
    type: Types.gaDeleteGallery,
    payload: galeria
})