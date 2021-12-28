import { fetchConToken, fetchSinToken } from "../helper/fetch"
import axios from 'axios'
import { Types } from "../types/Types"
import Swal from "sweetalert2"



export const startGetMains = () => {
    return async(dispatch) => {
        const resp = await fetchSinToken('carrusel')
        const body = await resp.json()

        if(body.ok) {
            dispatch(Mains(body.carrusel))
        }
    }
}

const Mains = (carrusel) => ({
    type: Types.magetMains,
    payload: carrusel
})

export const startCreateMain = (title, descripcion, file) => {
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
                const resp = await fetchConToken('carrusel', {title, image, idImage, descripcion}, 'POST');
                const body = await resp.json()

                dispatch(createMain(body))

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

        console.log(activeMain)

        const token = localStorage.getItem('token') || '';

            if(fileupload) {
                const ress = await axios.delete(`http://localhost:4000/api/image/upload/${activeMain.idImage}`, {headers: {'x-token': token}})

                if (ress.data.ok) {

                    const formData = new FormData()
                    formData.append('file', fileupload)
                    formData.append('title', activeMain.title)
        
                    const res = await axios.post('http://localhost:4000/api/image/upload', formData, {headers: {'x-token': token}})
        
                    console.log(res)
        
                // 
                // 
                
                    // const resp = await fetchConToken(`miniSerie/update/${serie.id}`, serie, 'PUT')
                    // const body = await resp.json()
        
                    if(res.data.ok) {
                        const image = res.data.image.url
                        const idImage = res.data.image.id
                        const resp = await fetchConToken(`carrusel/${activeMain._id}`, {title, image, idImage, descripcion}, 'PUT');
                        const body = await resp.json()
        
                        if (body.ok) {
        
                            dispatch(updateMain(body.carrusel))
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
                                title: 'Carrusel actualizado correctamente'
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

                const {image, idImage} = activeMain
                const resp = await fetchConToken(`carrusel/${activeMain._id}`, {title, image, idImage, descripcion}, 'PUT');
                const body = await resp.json()

                if (body.ok) {

                    dispatch(updateMain(body.carrusel))
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
            await axios.delete(`http://localhost:4000/api/image/upload/${activeMain.idImage}`, {headers: {'x-token': token}})

            const resp = await fetchConToken(`carrusel/${activeMain._id}`, activeMain, 'DELETE')
    
            if(resp.ok) {
                dispatch(deleteMain(activeMain))
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
                    timer: 10000,
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