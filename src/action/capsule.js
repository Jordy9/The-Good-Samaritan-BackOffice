import { fetchConToken, fetchSinToken } from "../helper/fetch"
import axios from 'axios'
import { Types } from "../types/Types"
import Swal from "sweetalert2"

export const startGetCapsules = () => {
    return async(dispatch) => {
        const resp = await fetchSinToken('capsule')
        const body = await resp.json()

        if(body.ok) {
            dispatch(Capsules(body.capsules))
        }
    }
}

const Capsules = (capsules) => ({
    type: Types.cagetCapsules,
    payload: capsules
})

export const startCreateCapsule = (title, date, descripcion, file) => {
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
                const resp = await fetchConToken('capsule', {title, date, image, idImage, descripcion}, 'POST');
                const body = await resp.json()

                dispatch(createCapsule(body))

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
                    title: 'Capsula creada correctamente'
                  })                
            }
    }
}

const createCapsule = (capsule) => ({
    type: Types.catcreateCapsule,
    payload: capsule
})

export const SetActiveCapsule = (capsule) => ({
    type: Types.catSetCapsule,
    payload: capsule
});

export const clearSetActiveCapsule = () => ({
    type: Types.catClearSetCapsule
});


export const startUpdateCapsule = (title, date, descripcion, fileupload) => {
    return async(dispatch, getState) => {

        const {activeCapsule} = getState().ca

        console.log(activeCapsule)

        const token = localStorage.getItem('token') || '';

            if(fileupload) {
                const ress = await axios.delete(`http://localhost:4000/api/image/upload/${activeCapsule.idImage}`, {headers: {'x-token': token}})

                if (ress.data.ok) {

                    const formData = new FormData()
                    formData.append('file', fileupload)
                    formData.append('title', activeCapsule.title)
        
                    const res = await axios.post('http://localhost:4000/api/image/upload', formData, {headers: {'x-token': token}})
        
                    console.log(res)
        
                // 
                // 
                
                    // const resp = await fetchConToken(`miniSerie/update/${serie.id}`, serie, 'PUT')
                    // const body = await resp.json()
        
                    if(res.data.ok) {
                        const image = res.data.image.url
                        const idImage = res.data.image.id
                        const resp = await fetchConToken(`capsule/${activeCapsule._id}`, {title, date, image, idImage, descripcion}, 'PUT');
                        const body = await resp.json()
        
                        if (body.ok) {
        
                            dispatch(updateCapsule(body.capsule))
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
                                title: 'Capsula actualizada correctamente'
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

                const {image, idImage} = activeCapsule
                const resp = await fetchConToken(`capsule/${activeCapsule._id}`, {title, date, image, idImage, descripcion}, 'PUT');
                const body = await resp.json()

                if (body.ok) {
                    dispatch(updateCapsule(body.capsule))
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
                        title: 'Capsula actualizada correctamente'
                      })
                }
            }

            

    }
}

const updateCapsule = (capsule) => ({
    type: Types.catUpdateCapsule,
    payload: capsule
})


export const startDeleteCapsule = () => {
    return async(dispatch, getState) => {
        const {activeCapsule} = getState().ca

        const token = localStorage.getItem('token') || '';

        if(activeCapsule.idImage) {
            await axios.delete(`http://localhost:4000/api/image/upload/${activeCapsule.idImage}`, {headers: {'x-token': token}})

            const resp = await fetchConToken(`capsule/${activeCapsule._id}`, activeCapsule, 'DELETE')
    
            if(resp.ok) {
                dispatch(deleteCapsule(activeCapsule))
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
                    title: 'Capsula eliminada correctamente'
                  })
            }
        } else {
            const resp = await fetchConToken(`capsule/${activeCapsule._id}`, activeCapsule, 'DELETE')
    
            if(resp.ok) {
                dispatch(deleteCapsule(activeCapsule))
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
                    title: 'Capsula eliminada correctamente'
                  })
            }
        }

    }
}

const deleteCapsule = (capsule) => ({
    type: Types.catDeleteCapsule,
    payload: capsule
})