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

export const startCreateGallery = (title, file, height, width) => {
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
                const resp = await fetchConToken('galeria', {title, image, idImage, height, width}, 'POST');
                const body = await resp.json()

                dispatch(createGallery(body))

                console.log(body)
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
                    title: 'Imagen de la galería creada correctamente'
                  })
                
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


export const startUpdateGallery = (title, fileupload, height, width) => {
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
                        const resp = await fetchConToken(`galeria/${activeGallery._id}`, {title, image, idImage, height, width}, 'PUT');
                        const body = await resp.json()
        
                        if (body.ok) {
        
                            dispatch(updateGallery(body.galeria))
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
                                title: 'Imagen de la galería actualizada correctamente'
                              })
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
                const resp = await fetchConToken(`galeria/${activeGallery._id}`, {title, image, idImage, height, width}, 'PUT');
                const body = await resp.json()

                if (body.ok) {

                    dispatch(updateGallery(body.galeria))
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
                        title: 'Imagen de la galeria actualizada correctamente'
                      })
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
                    title: 'Imagen de la galeria eliminada correctamente'
                  })
            }
        } else {
            const resp = await fetchConToken(`galeria/${activeGallery._id}`, activeGallery, 'DELETE')
    
            if(resp.ok) {
                dispatch(deleteGallery(activeGallery))
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
                    title: 'Imagen de la galeria eliminada correctamente'
                  })
            }
        }

    }
}

const deleteGallery = (galeria) => ({
    type: Types.gaDeleteGallery,
    payload: galeria
})