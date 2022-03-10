import { fetchConToken, fetchSinToken } from "../helper/fetch"
import axios from 'axios'
import { Types } from "../types/Types"
import Swal from "sweetalert2"


export const startGetVideoWordOfTheDay = () => {
    return async(dispatch) => {
        const resp = await fetchSinToken('VideoWordOfTheDay')
        const body = await resp.json()

        if(body.ok) {
            dispatch(VideoWordOfTheDay(body.video))
        }
    }
}

// export const startGetPaginateMiniSeries = (page) => {
//     return async(dispatch) => {
//         const resp = await fetchSinToken(`miniserie/series?page=${page || 1}`)
//         const body = await resp.json()

//         if(body.ok) {
//             dispatch(miniSeries(body.miniSeries))
//             dispatch(PaginateminiSeries({
//                 page: body.page,
//                 total: body.total
//             }))
//         }
//     }
// }

// const PaginateminiSeries = (series) => ({
//     type: Types.miPaginateSerie,
//     payload: series
// })

const VideoWordOfTheDay = (video) => ({
    type: Types.vwdgetVideosWordOfTheDay,
    payload: video
})

export const startCreateVideoWordOfTheDay = (title, file) => {
    return async(dispatch, getState) => {

        const {socket} = getState().sk

        const token = localStorage.getItem('token') || '';

            const formData = new FormData()
            formData.append('file', file)
            formData.append('title', title)

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {
              headers: {'x-token': token},
              onUploadProgress: (e) =>
                {dispatch(upload(Math.round( (e.loaded * 100) / e.total )))}
            })
            
            if(res.data.ok) {
                const image = res.data.image.url
                const idImage = res.data.image.id
                const resp = await fetchConToken('VideoWordOfTheDay', {title, image, idImage}, 'POST');
                const body = await resp.json()

                if (body.ok) {

                    dispatch(createVideoWordOfTheDay(body.video))

                    const subtitle = 'Nueva Palabra del Día agregada'

                    const payload = {title, subtitle}

                    socket?.emit('notifications-admin-to-user', payload)

                    dispatch(UploadFish())
                    
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
                        title: 'Video creado correctamente'
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

const UploadFish = () => ({
  type: Types.vwdUploadFinish
})

const upload = (progress) => ({
  type: Types.vwdUpload,
  payload: progress
})

const createVideoWordOfTheDay = (video) => ({
    type: Types.vwdcreateVideoWordOfTheDay,
    payload: video
})

export const SetActiveVideoWordOfTheDay = (video) => ({
    type: Types.vwdSetVideoWordOfTheDay,
    payload: video
});

export const clearSetActiveVideoWordOfTheDay = () => ({
    type: Types.vwdClearSetVideoWordOfTheDay
});


export const startUpdateVideoWordOfTheDay = (title, fileupload) => {
    return async(dispatch, getState) => {

        const {activeVideo} = getState().vwd

        const token = localStorage.getItem('token') || '';

        if(fileupload) {
            const ress = await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${activeVideo.idImage}`, {headers: {'x-token': token}})

            if (ress.data.ok) {

                const formData = new FormData()
                formData.append('file', fileupload)
                formData.append('title', activeVideo.title)
    
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {
                  headers: {'x-token': token},
                  onUploadProgress: (e) =>
                    {dispatch(upload(Math.round( (e.loaded * 100) / e.total )))}
                })
    
                if(res.data.ok) {
                    const image = res.data.image.url
                    const idImage = res.data.image.id
                    const resp = await fetchConToken(`VideoWordOfTheDay/${activeVideo._id}`, {title, image, idImage}, 'PUT');
                    const body = await resp.json()
    
                    if (body.ok) {
    
                        dispatch(updateVideoWordOfTheDay(body.video))
                        dispatch(UploadFish())
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
                            title: 'Video actualizado correctamente'
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
            const {image, idImage} = activeVideo
            const resp = await fetchConToken(`VideoWordOfTheDay/${activeVideo._id}`, {title, image, idImage}, 'PUT');
            const body = await resp.json()

            if (body.ok) {

                dispatch(updateVideoWordOfTheDay(body.video))
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
                    title: 'Video actualizado correctamente'
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
    
    const updateVideoWordOfTheDay = (video) => ({
        type: Types.vwdUpdateVideoWordOfTheDay,
        payload: video
    })
    
    
    export const startDeleteVideoWordOfTheDay = () => {
        return async(dispatch, getState) => {
            const {activeVideo} = getState().vwd
    
            const token = localStorage.getItem('token') || '';
    
            if(activeVideo.idImage) {
                await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${activeVideo.idImage}`, {headers: {'x-token': token}})
    
                const resp = await fetchConToken(`VideoWordOfTheDay/${activeVideo._id}`, activeVideo, 'DELETE')
        
                if(resp.ok) {
                    dispatch(deleteVideoWordOfTheDay(activeVideo))
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
                        title: 'Video eliminada correctamente'
                      })
                }
            } else {
                const resp = await fetchConToken(`VideoWordOfTheDay/${activeVideo._id}`, activeVideo, 'DELETE')
        
                if(resp.ok) {
                    dispatch(VideoWordOfTheDay(activeVideo))
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
                        title: 'Video eliminada correctamente'
                      })
                }
            }
    
            }

            
    }

const deleteVideoWordOfTheDay = (video) => ({
    type: Types.vwdDeleteVideoWordOfTheDay,
    payload: video
})