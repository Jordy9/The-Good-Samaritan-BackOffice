import { fetchConToken, fetchSinToken } from "../helper/fetch"
import axios from 'axios'
import { Types } from "../types/Types"
import Swal from "sweetalert2"
import moment from "moment"



// export const startGetMains = () => {
//     return async(dispatch) => {
//         const resp = await fetchSinToken('carrusel')
//         const body = await resp.json()

//         if(body.ok) {
//             dispatch(Mains(body.carrusel))
//         }
//     }
// }

export const startGetPaginateMains = (page) => {
    return async(dispatch) => {
        const resp = await fetchSinToken(`carrusel/ca?page=${page || 1}`)
        const body = await resp.json()

        if(body.ok) {
            dispatch(Mains(body.carrusel))
            dispatch(PaginateMain({
                page: body.page,
                total: body.total
            }))
        }
    }
}

const PaginateMain = (carrusel) => ({
    type: Types.maPaginateMain,
    payload: carrusel
})

const Mains = (carrusel) => ({
    type: Types.magetMains,
    payload: carrusel
})

export const startCreateMain = (title, descripcion, file) => {
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
                const resp = await fetchConToken('carrusel', {title, date, image, idImage, descripcion}, 'POST');
                const body = await resp.json()

                dispatch(createMain(body))

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
                    title: 'Carrusel creado correctamente'
                  })
                
            }
    }
}

const createMain = (carrusel) => ({
    type: Types.macreateMain,
    payload: carrusel
})

export const SetActiveMain = (carrusel) => ({
    type: Types.maSetMain,
    payload: carrusel
});

export const clearSetActiveMain = () => ({
    type: Types.maClearSetMain
});


export const startUpdateMain = (title, descripcion, fileupload) => {
    return async(dispatch, getState) => {

        const {activeMain} = getState().ma

        const date = activeMain?.date

        const token = localStorage.getItem('token') || '';

            if(fileupload) {
                const ress = await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${activeMain.idImage}`, {headers: {'x-token': token}})

                if (ress.data.ok) {

                    const formData = new FormData()
                    formData.append('file', fileupload)
                    formData.append('title', activeMain.title)
        
                    const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {headers: {'x-token': token}})
        
                    if(res.data.ok) {
                        const image = res.data.image.url
                        const idImage = res.data.image.id
                        const resp = await fetchConToken(`carrusel/${activeMain._id}`, {title, date, image, idImage, descripcion}, 'PUT');
                        const body = await resp.json()
        
                        if (body.ok) {
        
                            dispatch(updateMain(body.carrusel))
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
                                title: 'Carrusel actualizado correctamente'
                              })
                        }
                
                    } else {
                        Swal.fire('Error', res.errors, 'error')
                    }
                } else {
                    Swal.fire('Error', ress.errors, 'error')
                }
            } else {

                const {image, idImage} = activeMain
                const resp = await fetchConToken(`carrusel/${activeMain._id}`, {title, date, image, idImage, descripcion}, 'PUT');
                const body = await resp.json()

                if (body.ok) {

                    dispatch(updateMain(body.carrusel))
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
                        title: 'Carrusel actualizado correctamente'
                      })
                }
            }

            

    }
}

const updateMain = (evento) => ({
    type: Types.maUpdateMain,
    payload: evento
})


export const startDeleteMain = () => {
    return async(dispatch, getState) => {
        const {activeMain} = getState().ma

        const token = localStorage.getItem('token') || '';

        if(activeMain.idImage) {
            await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${activeMain.idImage}`, {headers: {'x-token': token}})

            const resp = await fetchConToken(`carrusel/${activeMain._id}`, activeMain, 'DELETE')
    
            if(resp.ok) {
                dispatch(deleteMain(activeMain))
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
                    title: 'Carrusel eliminado correctamente'
                  })
            }
        } else {
            const resp = await fetchConToken(`carrusel/${activeMain._id}`, activeMain, 'DELETE')
    
            if(resp.ok) {
                dispatch(deleteMain(activeMain))
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
                    title: 'Carrusel eliminado correctamente'
                  })
            }
        }

    }
}

const deleteMain = (carrusel) => ({
    type: Types.maDeleteMain,
    payload: carrusel
})