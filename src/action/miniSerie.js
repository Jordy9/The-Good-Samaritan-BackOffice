import { fetchConToken, fetchSinToken } from "../helper/fetch"
import axios from 'axios'
import { Types } from "../types/Types"
import Swal from "sweetalert2"


// export const startGetMiniSeries = () => {
//     return async(dispatch) => {
//         const resp = await fetchSinToken('miniserie')
//         const body = await resp.json()

//         if(body.ok) {
//             dispatch(miniSeries(body.miniSeries))
//         }
//     }
// }

export const startGetPaginateMiniSeries = (page) => {
    return async(dispatch) => {
        const resp = await fetchSinToken(`miniserie/series?page=${page || 1}`)
        const body = await resp.json()

        if(body.ok) {
            dispatch(miniSeries(body.miniSeries))
            dispatch(PaginateminiSeries({
                page: body.page,
                total: body.total
            }))
        }
    }
}

const PaginateminiSeries = (series) => ({
    type: Types.miPaginateSerie,
    payload: series
})

const miniSeries = (series) => ({
    type: Types.migetSeries,
    payload: series
})

export const startCreateMiniSerie = (title, date, descripcion, file) => {
    return async(dispatch, getState) => {

        const {socket} = getState().sk

        const token = localStorage.getItem('token') || '';

            const formData = new FormData()
            formData.append('file', file)
            formData.append('title', title)

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {
              headers: {'x-token': token},
              onUploadProgress: (e) =>
                {const Porcentage = Math.round( (e.loaded * 100) / e.total )
                
                const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                // loaderHtml: `${Porcentage}`,
              })

              return Toast.fire({
                title: 'Subiendo imagen',
                html: `<div class="progress"><div class="progress-bar" role="progressbar" style="width: ${Porcentage}%;" aria-valuemin="0" aria-valuemax="100">${Porcentage}%</div> </div>`
              })}
            })
            
            if(res.data.ok) {
                const image = res.data.image.url
                const idImage = res.data.image.id
                const resp = await fetchConToken('miniSerie', {title, date, image, idImage, descripcion}, 'POST');
                const body = await resp.json()

                if (body.ok) {

                    dispatch(getMiniSerie(body.miniSerie))

                    const subtitle = 'Nueva MiniSerie agregada'

                    const payload = {title, subtitle, image}

                    socket?.emit('notifications-admin-to-user', payload)
                    
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
                        title: 'Mini Serie creada correctamente'
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
}

const getMiniSerie = (Serie) => ({
    type: Types.micreateSerie,
    payload: Serie
})

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

        if(fileupload) {
            const ress = await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${activeSerie.idImage}`, {headers: {'x-token': token}})

            if (ress.data.ok) {

                const formData = new FormData()
                formData.append('file', fileupload)
                formData.append('title', activeSerie.title)
    
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {
                  headers: {'x-token': token},
                  onUploadProgress: (e) =>
                    {const Porcentage = Math.round( (e.loaded * 100) / e.total )
                    
                    const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    // loaderHtml: `${Porcentage}`,
                  })

                  return Toast.fire({
                    title: 'Subiendo imagen',
                    html: `<div class="progress"><div class="progress-bar" role="progressbar" style="width: ${Porcentage}%;" aria-valuemin="0" aria-valuemax="100">${Porcentage}%</div> </div>`
                  })}
                })
    
                if(res.data.ok) {
                    const image = res.data.image.url
                    const idImage = res.data.image.id
                    const resp = await fetchConToken(`miniSerie/${activeSerie._id}`, {title, date, image, idImage, descripcion}, 'PUT');
                    const body = await resp.json()
    
                    if (body.ok) {
    
                        dispatch(updateSerie(body.miniSerie))
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
                            title: 'Mini Serie actualizada correctamente'
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
                        title: `${res.errors}`
                      })
                }
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
                    title: `${ress.errors}`
                  })
            }

        } else {
            const {image, idImage} = activeSerie
            const resp = await fetchConToken(`miniSerie/${activeSerie._id}`, {title, date, image, idImage, descripcion}, 'PUT');
            const body = await resp.json()

            if (body.ok) {

                dispatch(updateSerie(body.miniSerie))
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
                    title: 'Mini Serie actualizada correctamente'
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
                await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${activeSerie.idImage}`, {headers: {'x-token': token}})
    
                const resp = await fetchConToken(`miniSerie/${activeSerie._id}`, activeSerie, 'DELETE')
        
                if(resp.ok) {
                    dispatch(deleteSerie(activeSerie))
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
                        title: 'Mini Serie eliminada correctamente'
                      })
                }
            } else {
                const resp = await fetchConToken(`miniSerie/${activeSerie._id}`, activeSerie, 'DELETE')
        
                if(resp.ok) {
                    dispatch(deleteSerie(activeSerie))
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
                        title: 'Mini Serie eliminada correctamente'
                      })
                }
            }
    
            }

            
    }

const deleteSerie = (user) => ({
    type: Types.miDeleteSerie,
    payload: user
})