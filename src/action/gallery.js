import { fetchConToken, fetchSinToken } from "../helper/fetch"
import axios from 'axios'
import { Types } from "../types/Types"
import Swal from "sweetalert2"
import moment from "moment"



// export const startGetGallery = () => {
//     return async(dispatch) => {
//         const resp = await fetchSinToken('galeria')
//         const body = await resp.json()

//         if(body.ok) {
//             dispatch(Gallerys(body.galeria))
//         }
//     }
// }

export const startGetPaginateGallery = (page) => {
    return async(dispatch) => {
        const resp = await fetchSinToken(`galeria/ga?page=${page || 1}`)
        const body = await resp.json()

        if(body.ok) {
            dispatch(Gallerys(body.galeria))
            dispatch(PaginateGallery({
                page: body.page,
                total: body.total
            }))
        }
    }
}

const PaginateGallery = (eventos) => ({
    type: Types.gaPaginateGallery,
    payload: eventos
})

const Gallerys = (galeria) => ({
    type: Types.gagetGallerys,
    payload: galeria
})

export const startCreateGallery = (title, file) => {
    return async(dispatch) => {

        const date = moment()

        const token = localStorage.getItem('token') || '';

            const formData = new FormData()
            formData.append('file', file)
            formData.append('title', title)

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {headers: {'x-token': token}})
            
            if(res.data.ok) {
                const image = res.data.image.url
                const idImage = res.data.image.id
                const resp = await fetchConToken('galeria', {title, date, image, idImage}, 'POST');
                const body = await resp.json()

                dispatch(createGallery(body))

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


export const startUpdateGallery = (title, fileupload) => {
    return async(dispatch, getState) => {

        const {activeGallery} = getState().ga

        const date = activeGallery?.date

        const token = localStorage.getItem('token') || '';

            if(fileupload) {
                const ress = await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${activeGallery.idImage}`, {headers: {'x-token': token}})

                if (ress.data.ok) {

                    const formData = new FormData()
                    formData.append('file', fileupload)
                    formData.append('title', activeGallery.title)
        
                    const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {headers: {'x-token': token}})
        
                    if(res.data.ok) {
                        const image = res.data.image.url
                        const idImage = res.data.image.id
                        const resp = await fetchConToken(`galeria/${activeGallery._id}`, {title, date, image, idImage}, 'PUT');
                        const body = await resp.json()
        
                        if (body.ok) {
        
                            dispatch(updateGallery(body.galeria))
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
                                title: 'Imagen de la galería actualizada correctamente'
                              })
                        }
                
                    } else {
                        Swal.fire('Error', res.errors, 'error')
                    }
                } else {
                    Swal.fire('Error', ress.errors, 'error')
                }
            } else {

                const {image, idImage} = activeGallery
                const resp = await fetchConToken(`galeria/${activeGallery._id}`, {title, date, image, idImage}, 'PUT');
                const body = await resp.json()

                if (body.ok) {

                    dispatch(updateGallery(body.galeria))
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
            await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${activeGallery.idImage}`, {headers: {'x-token': token}})

            const resp = await fetchConToken(`galeria/${activeGallery._id}`, activeGallery, 'DELETE')
    
            if(resp.ok) {
                dispatch(deleteGallery(activeGallery))
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
                    timer: 5000,
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