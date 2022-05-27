import { fetchConToken, fetchSinToken } from "../helper/fetch"
import axios from 'axios'
import { Types } from "../types/Types"
import Swal from "sweetalert2"
import moment from "moment"


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

export const startCreateMiniSerie = (title, descripcion, file) => {
    return async(dispatch, getState) => {

        const {socket} = getState().sk

        const token = localStorage.getItem('token') || '';

            const formData = new FormData()
            formData.append('file', file)
            formData.append('title', title)

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload/seriesBosquejos`, formData, {
              headers: {'x-token': token},
              onUploadProgress: (e) =>
                {dispatch(upload(Math.round( (e.loaded * 100) / e.total )))}
            })
            
            if(res.data.ok) {
                const image = res.data.image.url
                const idImage = res.data.image.id
                const resp = await fetchConToken('miniSerie', {title, image, idImage, descripcion}, 'POST');
                const body = await resp.json()

                if (body.ok) {

                    dispatch(getMiniSerie(body.miniSerie))

                    const subtitle = 'Nueva MiniSerie agregada'

                    const content = body.miniSerie

                    const payload = {title, subtitle, image, content}

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

const UploadFish = () => ({
  type: Types.miUploadFinish
})

const upload = (progress) => ({
  type: Types.miUpload,
  payload: progress
})

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


export const startUpdateSerie = (title, descripcion, fileupload) => {
    return async(dispatch, getState) => {

        const count = descripcion?.length - 1

        const {activeSerie} = getState().mi

        const {activeUser} = getState().auth

        const {socket} = getState().sk

        const updatedAt = moment()

        const token = localStorage.getItem('token') || '';

        if (activeSerie?.user === activeUser?.id) {
          if(fileupload) {
            
            const formData = new FormData()
            formData.append('file', fileupload)
            formData.append('title', activeSerie.title)
            
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload/seriesBosquejos`, formData, {
              headers: {'x-token': token},
              onUploadProgress: (e) =>
              {dispatch(upload(Math.round( (e.loaded * 100) / e.total )))}
            })
            
            if(res.data.ok) {
              const image = res.data.image.url
              const idImage = res.data.image.id
              const resp = await fetchConToken(`miniSerie/${activeSerie._id}`, {title, image, idImage, descripcion, updatedAt, count}, 'PUT');
              const body = await resp.json()
              
              if (body.ok) {
                
                dispatch(updateSerie(body.miniSerie))
                dispatch(UploadFish())
                
                socket?.emit('notifications-admin-to-user-update', body.miniSerie)
                const ress = await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${activeSerie.idImage}`, {headers: {'x-token': token}})
                console.log(ress)
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
            const {image, idImage} = activeSerie
            const resp = await fetchConToken(`miniSerie/${activeSerie._id}`, {title, image, idImage, descripcion, updatedAt, count}, 'PUT');
            const body = await resp.json()

            if (body.ok) {

                dispatch(updateSerie(body.miniSerie))
                socket?.emit('notifications-admin-to-user-update', body.miniSerie)
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
              title: 'No tiene el privilegio para editar esta mini serie'
            })
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

            const {activeUser} = getState().auth

            const {socket} = getState().sk
    
            const token = localStorage.getItem('token') || '';

            if (activeSerie?.user === activeUser?.id) {
              if(activeSerie.idImage) {
                  await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${activeSerie.idImage}`, {headers: {'x-token': token}})
      
                  const resp = await fetchConToken(`miniSerie/${activeSerie._id}`, activeSerie, 'DELETE')
                  const body = await resp.json()
          
                  if(body.ok) {
                      dispatch(deleteSerie(activeSerie))
                      socket?.emit('notifications-admin-to-user-delete', activeSerie._id)
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

              } else {
                  const resp = await fetchConToken(`miniSerie/${activeSerie._id}`, activeSerie, 'DELETE')
                  const body = await resp.json()
          
                  if(body.ok) {
                      dispatch(deleteSerie(activeSerie))
                      socket?.emit('notifications-admin-to-user-delete', activeSerie._id)
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
                  title: 'No tiene el privilegio para eliminar esta mini serie'
                })
          }
    
            }

            
    }

const deleteSerie = (user) => ({
    type: Types.miDeleteSerie,
    payload: user
})