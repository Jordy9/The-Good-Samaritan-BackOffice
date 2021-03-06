import { fetchConToken, fetchSinToken } from "../helper/fetch"
import axios from 'axios'
import { Types } from "../types/Types"
import Swal from "sweetalert2"

// export const startGetCapsules = () => {
//     return async(dispatch) => {
//         const resp = await fetchSinToken('capsule')
//         const body = await resp.json()

//         if(body.ok) {
//             dispatch(Capsules(body.capsules))
//         }
//     }
// }

export const startGetPaginateCapsules = (page) => {
    return async(dispatch) => {
        const resp = await fetchSinToken(`capsule/cap?page=${page || 1}`)
        const body = await resp.json()

        if(body.ok) {
            dispatch(Capsules(body.capsules))
            dispatch(PaginateCapsules({
                page: body.page,
                total: body.total
            }))
        }
    }
}

const PaginateCapsules = (capsules) => ({
    type: Types.caPaginateCapsule,
    payload: capsules
})

const Capsules = (capsules) => ({
    type: Types.cagetCapsules,
    payload: capsules
})

export const startCreateCapsule = (title, descripcion, file) => {
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
                const resp = await fetchConToken('capsule', {title, image, idImage, descripcion}, 'POST');
                const body = await resp.json()

                if (body.ok) {

                    dispatch(createCapsule(body))

                    const subtitle = 'Nueva C??psula agregada'

                    const content = body.capsuleguardado

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
                        title: 'Capsula creada correctamente'
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
  type: Types.caUploadFinish
})

const upload = (progress) => ({
  type: Types.caUpload,
  payload: progress
})

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


export const startUpdateCapsule = (title, descripcion, fileupload) => {
    return async(dispatch, getState) => {

        const {activeCapsule} = getState().ca

        const {socket} = getState().sk

        const {activeUser} = getState().auth

        const token = localStorage.getItem('token') || '';

        if (activeCapsule?.user === activeUser?.id) {

          if(fileupload) {
            
            const formData = new FormData()
            formData.append('file', fileupload)
            formData.append('title', activeCapsule.title)
            
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {
              headers: {'x-token': token},
              onUploadProgress: (e) =>
              {dispatch(upload( Math.round( (e.loaded * 100) / e.total )))}
            })
            
            if(res.data.ok) {
              const image = res.data.image.url
              const idImage = res.data.image.id
              const resp = await fetchConToken(`capsule/${activeCapsule._id}`, {title, image, idImage, descripcion}, 'PUT');
              const body = await resp.json()
              
              if (body.ok) {
                
                dispatch(updateCapsule(body.capsule))
                dispatch(UploadFish())
                socket?.emit('notifications-admin-to-user-update', body.capsule)
                const ress = await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${activeCapsule.idImage}`, {headers: {'x-token': token}})
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
                              title: 'Capsula actualizada correctamente'
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
  
              const {image, idImage} = activeCapsule
              const resp = await fetchConToken(`capsule/${activeCapsule._id}`, {title, image, idImage, descripcion}, 'PUT');
              const body = await resp.json()
  
              if (body.ok) {
                  dispatch(updateCapsule(body.capsule))
                  socket?.emit('notifications-admin-to-user-update', body.capsule)
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
                      title: 'Capsula actualizada correctamente'
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
            title: 'No tiene el privilegio para editar esta c??psula'
          })
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

        const {activeUser} = getState().auth

        const {socket} = getState().sk

        const token = localStorage.getItem('token') || '';

        if (activeCapsule?.user === activeUser?.id) {

          if(activeCapsule.idImage) {
              await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${activeCapsule.idImage}`, {headers: {'x-token': token}})
  
              const resp = await fetchConToken(`capsule/${activeCapsule._id}`, activeCapsule, 'DELETE')
              const body = await resp.json()
      
              if(body.ok) {
                  dispatch(deleteCapsule(activeCapsule))
                  socket?.emit('notifications-admin-to-user-delete', activeCapsule._id)
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
                      title: 'Capsula eliminada correctamente'
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
              const resp = await fetchConToken(`capsule/${activeCapsule._id}`, activeCapsule, 'DELETE')
              const body = await resp.json()
      
              if(body.ok) {
                  dispatch(deleteCapsule(activeCapsule))
                  socket?.emit('notifications-admin-to-user-delete', activeCapsule._id)
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
                      title: 'Capsula eliminada correctamente'
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
            title: 'No tiene el privilegio para eliminar esta c??psula'
          })
        }

    }
}

const deleteCapsule = (capsule) => ({
    type: Types.catDeleteCapsule,
    payload: capsule
})