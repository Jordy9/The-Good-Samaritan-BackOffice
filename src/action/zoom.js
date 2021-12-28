import { fetchConToken, fetchSinToken } from "../helper/fetch"
import axios from 'axios'
import { Types } from "../types/Types"
import Swal from "sweetalert2"



export const startGetZoom = () => {
    return async(dispatch) => {
        const resp = await fetchSinToken('zoom')
        const body = await resp.json()

        if(body.ok) {
            dispatch(Zooms(body.zoom))
        }
    }
}

const Zooms = (zoom) => ({
    type: Types.zmgetZooms,
    payload: zoom
})

export const startCreateZoom = (title, date, file) => {
    return async(dispatch, getState) => {

        const {Zoom} = getState().zm

        const zoom = Zoom[0]

        console.log(zoom)

        const token = localStorage.getItem('token') || '';

        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', title)

        if(zoom) {

            const ress = await axios.delete(`http://localhost:4000/api/image/upload/${zoom.idImage}`, {headers: {'x-token': token}})

            if(ress.data.ok) {
                const res = await axios.post('http://localhost:4000/api/image/upload', formData, {headers: {'x-token': token}})

                console.log(res)

                
                if(res.data.ok) {
                    const image = res.data.image.url
                    const idImage = res.data.image.id
                    const resp = await fetchConToken(`zoom/${zoom._id}`, {title, date, image, idImage}, 'PUT');
                    const body = await resp.json()

                    dispatch(createZoom(body))

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
                        title: 'Zoom creado correctamente'
                      })
                    
                }
            }
        } else {
            const res = await axios.post('http://localhost:4000/api/image/upload', formData, {headers: {'x-token': token}})

            console.log(res)

            
            if(res.data.ok) {
                const image = res.data.image.url
                const idImage = res.data.image.id
                const resp = await fetchConToken('zoom', {title, date, image, idImage}, 'POST');
                const body = await resp.json()

                dispatch(createZoom(body))

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
                    title: 'Zoom actualizado correctamente'
                  })
                
            }
        }
    }
}

const createZoom = (zoom) => ({
    type: Types.zmcreateZoom,
    payload: zoom
})

export const SetActiveZoom = (zoom) => ({
    type: Types.evSetEvent,
    payload: zoom
});


// export const startUpdateEvento = (title, date, descripcion, fileupload) => {
//     return async(dispatch, getState) => {

//         const {activeEvent} = getState().ev

//         console.log(activeEvent)

//         const token = localStorage.getItem('token') || '';

//             if(fileupload) {
//                 const ress = await axios.delete(`http://localhost:4000/api/image/upload/${activeEvent.idImage}`, {headers: {'x-token': token}})

//                 if (ress.data.ok) {

//                     const formData = new FormData()
//                     formData.append('file', fileupload)
//                     formData.append('title', activeEvent.title)
        
//                     const res = await axios.post('http://localhost:4000/api/image/upload', formData, {headers: {'x-token': token}})
        
//                     console.log(res)
        
//                 // 
//                 // 
                
//                     // const resp = await fetchConToken(`miniSerie/update/${serie.id}`, serie, 'PUT')
//                     // const body = await resp.json()
        
//                     if(res.data.ok) {
//                         const image = res.data.image.url
//                         const idImage = res.data.image.id
//                         const resp = await fetchConToken(`evento/${activeEvent.id}`, {title, date, image, idImage, descripcion}, 'PUT');
//                         const body = await resp.json()
        
//                         if (body.ok) {
        
//                             dispatch(updateEvento(activeEvent))
//                             Swal.fire('Exito', 'Usuario actualizado exitosamente', 'success')
//                         }
                
//                     } else {
//                         console.log(res.errors)
//                         Swal.fire('Error', res.errors, 'error')
//                     }
//                 } else {
//                     Swal.fire('Error', ress.errors, 'error')
//                 }
//             } else {

//                 const {image, idImage} = activeEvent
//                 const resp = await fetchConToken(`evento/${activeEvent.id}`, {title, date, image, idImage, descripcion}, 'PUT');
//                 const body = await resp.json()

//                 if (body.ok) {

//                     dispatch(updateEvento(activeEvent))
//                     Swal.fire('Exito', 'Usuario actualizado exitosamente', 'success')
//                 }
//             }

            

//     }
// }

// const updateEvento = (evento) => ({
//     type: Types.evUpdateEvent,
//     payload: evento
// })


// export const startDeleteEvento = () => {
//     return async(dispatch, getState) => {
//         const {activeEvent} = getState().ev

//         const token = localStorage.getItem('token') || '';

//         if(activeEvent.idImage) {
//             await axios.delete(`http://localhost:4000/api/image/upload/${activeEvent.idImage}`, {headers: {'x-token': token}})

//             const resp = await fetchConToken(`evento/${activeEvent._id}`, activeEvent, 'DELETE')
    
//             if(resp.ok) {
//                 dispatch(deleteEvento(activeEvent))
//             }
//         } else {
//             const resp = await fetchConToken(`evento/${activeEvent._id}`, activeEvent, 'DELETE')
    
//             if(resp.ok) {
//                 dispatch(deleteEvento(activeEvent))
//             }
//         }

//     }
// }

// const deleteEvento = (evento) => ({
//     type: Types.evDeleteEvent,
//     payload: evento
// })