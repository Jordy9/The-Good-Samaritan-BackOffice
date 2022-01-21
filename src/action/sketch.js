import { fetchConToken, fetchSinToken } from "../helper/fetch"
import axios from 'axios'
import { Types } from "../types/Types"
import Swal from "sweetalert2"



// export const startGetBosquejos = () => {
//     return async(dispatch) => {
//         const resp = await fetchSinToken('bosquejo')
//         const body = await resp.json()

//         if(body.ok) {
//             dispatch(Bosquejos(body.bosquejos))
//         }
//     }
// }

export const startGetPaginateBosquejos = (page) => {
    return async(dispatch) => {
        const resp = await fetchSinToken(`bosquejo/bosquejos?page=${page || 1}`)
        const body = await resp.json()

        if(body.ok) {
            dispatch(Bosquejos(body.bosquejos))
            dispatch(PaginateBosquejos({
                page: body.page,
                total: body.total
            }))
        }
    }
}

const PaginateBosquejos = (bosquejos) => ({
    type: Types.sktPaginateBosquejo,
    payload: bosquejos
})

const Bosquejos = (bosquejos) => ({
    type: Types.sktgetBosquejos,
    payload: bosquejos
})

export const startCreateBosquejo = (title, date, descripcion, file) => {
    return async(dispatch) => {

        const token = localStorage.getItem('token') || '';

            const formData = new FormData()
            formData.append('file', file)
            formData.append('title', title)

            const res = await axios.post('http://localhost:4000/api/image/upload', formData, {headers: {'x-token': token}})
            
            if(res.data.ok) {
                const image = res.data.image.url
                const idImage = res.data.image.id
                const resp = await fetchConToken('bosquejo', {title, date, image, idImage, descripcion}, 'POST');
                const body = await resp.json()

                dispatch(createBosquejo(body))

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
                    title: 'Bosquejo creado correctamente'
                  })                
            }
    }
}

const createBosquejo = (bosquejo) => ({
    type: Types.sktcreateBosquejo,
    payload: bosquejo
})

export const SetActiveBosquejo = (bosquejo) => ({
    type: Types.sktSetBosquejo,
    payload: bosquejo
});

export const clearSetActiveBosquejo = () => ({
    type: Types.sktClearSetBosquejo
});


export const startUpdateBosquejo = (title, date, descripcion, fileupload) => {
    return async(dispatch, getState) => {

        const {activeBosquejo} = getState().skt

        const token = localStorage.getItem('token') || '';

            if(fileupload) {
                const ress = await axios.delete(`http://localhost:4000/api/image/upload/${activeBosquejo.idImage}`, {headers: {'x-token': token}})

                if (ress.data.ok) {

                    const formData = new FormData()
                    formData.append('file', fileupload)
                    formData.append('title', activeBosquejo.title)
        
                    const res = await axios.post('http://localhost:4000/api/image/upload', formData, {headers: {'x-token': token}})
        
                    if(res.data.ok) {
                        const image = res.data.image.url
                        const idImage = res.data.image.id
                        const resp = await fetchConToken(`bosquejo/${activeBosquejo._id}`, {title, date, image, idImage, descripcion}, 'PUT');
                        const body = await resp.json()
        
                        if (body.ok) {
        
                            dispatch(updateBosquejo(body.bosquejo))
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
                                title: 'Bosquejo actualizado correctamente'
                              })
                        }
                
                    } else {
                        Swal.fire('Error', res.errors, 'error')
                    }
                } else {
                    Swal.fire('Error', ress.errors, 'error')
                }
            } else {

                const {image, idImage} = activeBosquejo
                const resp = await fetchConToken(`bosquejo/${activeBosquejo._id}`, {title, date, image, idImage, descripcion}, 'PUT');
                const body = await resp.json()

                if (body.ok) {
                    dispatch(updateBosquejo(body.bosquejo))
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
                        title: 'Bosquejo actualizado correctamente'
                      })
                }
            }

            

    }
}

const updateBosquejo = (user) => ({
    type: Types.sktUpdateBosquejo,
    payload: user
})


export const startDeleteBosquejo = () => {
    return async(dispatch, getState) => {
        const {activeBosquejo} = getState().skt

        const token = localStorage.getItem('token') || '';

        if(activeBosquejo.idImage) {
            await axios.delete(`http://localhost:4000/api/image/upload/${activeBosquejo.idImage}`, {headers: {'x-token': token}})

            const resp = await fetchConToken(`bosquejo/${activeBosquejo._id}`, activeBosquejo, 'DELETE')
    
            if(resp.ok) {
                dispatch(deleteBosquejo(activeBosquejo))
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
                    title: 'Bosquejo eliminado correctamente'
                  })
            }
        } else {
            const resp = await fetchConToken(`bosquejo/${activeBosquejo._id}`, activeBosquejo, 'DELETE')
    
            if(resp.ok) {
                dispatch(deleteBosquejo(activeBosquejo))
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
                    title: 'Bosquejo eliminado correctamente'
                  })
            }
        }

    }
}

const deleteBosquejo = (bosquejo) => ({
    type: Types.sktDeleteBosquejo,
    payload: bosquejo
})