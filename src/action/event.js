import { fetchConToken, fetchSinToken } from "../helper/fetch"
import axios from 'axios'
import { Types } from "../types/Types"
import Swal from "sweetalert2"


// export const startGetEventos = () => {
//     return async(dispatch) => {
//         const resp = await fetchSinToken('evento')
//         const body = await resp.json()

//         if(body.ok) {
//             // console.log(prepareEvents(body.eventos))
//             dispatch(Eventos(body.eventos))
//         }
//     }
// }

export const startGetPaginateEventos = (page) => {
    return async(dispatch) => {
        const resp = await fetchSinToken(`evento/eve?page=${page || 1}`)
        const body = await resp.json()

        if(body.ok) {
            dispatch(Eventos(body.eventos))
            dispatch(PaginateEventos({
                page: body.page,
                total: body.total
            }))
        }
    }
}

const PaginateEventos = (eventos) => ({
    type: Types.evPaginateEvent,
    payload: eventos
})

const Eventos = (eventos) => ({
    type: Types.evgetEvents,
    payload: eventos
})

export const startCreateEvento = (title, date, file, descripcion) => {
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
                const resp = await fetchConToken('evento', {title, date, image, idImage, descripcion}, 'POST');
                const body = await resp.json()

                dispatch(createEvento(body))

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
                    title: 'Evento creado correctamente'
                  })
                
            }
    }
}

const createEvento = (evento) => ({
    type: Types.evcreateEvent,
    payload: evento
})

export const SetActiveEvent = (evento) => ({
    type: Types.evSetEvent,
    payload: evento
});

export const clearSetActiveEvent = () => ({
    type: Types.evClearSetEvent
});


export const startUpdateEvento = (title, date, descripcion, fileupload) => {
    return async(dispatch, getState) => {

        const {activeEvent} = getState().ev

        console.log(activeEvent)

        const token = localStorage.getItem('token') || '';

            if(fileupload) {
                const ress = await axios.delete(`http://localhost:4000/api/image/upload/${activeEvent.idImage}`, {headers: {'x-token': token}})

                if (ress.data.ok) {

                    const formData = new FormData()
                    formData.append('file', fileupload)
                    formData.append('title', activeEvent.title)
        
                    const res = await axios.post('http://localhost:4000/api/image/upload', formData, {headers: {'x-token': token}})
        
                    console.log(res)
        
                // 
                // 
                
                    // const resp = await fetchConToken(`miniSerie/update/${serie.id}`, serie, 'PUT')
                    // const body = await resp.json()
        
                    if(res.data.ok) {
                        const image = res.data.image.url
                        const idImage = res.data.image.id
                        const resp = await fetchConToken(`evento/${activeEvent.id}`, {title, date, image, idImage, descripcion}, 'PUT');
                        const body = await resp.json()
        
                        if (body.ok) {
        
                            dispatch(updateEvento(body.evento))
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
                                title: 'Evento actualizado correctamente'
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

                const {image, idImage} = activeEvent
                const resp = await fetchConToken(`evento/${activeEvent.id}`, {title, date, image, idImage, descripcion}, 'PUT');
                const body = await resp.json()

                if (body.ok) {

                    dispatch(updateEvento(body.evento))
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
                        title: 'Evento actualizado correctamente'
                      })
                }
            }

            

    }
}

const updateEvento = (evento) => ({
    type: Types.evUpdateEvent,
    payload: evento
})


export const startDeleteEvento = () => {
    return async(dispatch, getState) => {
        const {activeEvent} = getState().ev

        const token = localStorage.getItem('token') || '';

        if(activeEvent.idImage) {
            await axios.delete(`http://localhost:4000/api/image/upload/${activeEvent.idImage}`, {headers: {'x-token': token}})

            const resp = await fetchConToken(`evento/${activeEvent.id}`, activeEvent, 'DELETE')
    
            if(resp.ok) {
                dispatch(deleteEvento(activeEvent))
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
                    title: 'Evento eliminado correctamente'
                  })
            }
        } else {
            const resp = await fetchConToken(`evento/${activeEvent._id}`, activeEvent, 'DELETE')
    
            if(resp.ok) {
                dispatch(deleteEvento(activeEvent))
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
                    title: 'Evento eliminado correctamente'
                  })
            }
        }

    }
}

const deleteEvento = (evento) => ({
    type: Types.evDeleteEvent,
    payload: evento
})