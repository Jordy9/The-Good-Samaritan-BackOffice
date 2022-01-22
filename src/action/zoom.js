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

export const startCreateZoom = (title, date, file, id, password) => {
    return async(dispatch, getState) => {

        const {Zoom} = getState().zm

        const zoom = Zoom[0]

        const token = localStorage.getItem('token') || '';

        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', title)

        if(zoom) {

            const ress = await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${zoom.idImage}`, {headers: {'x-token': token}})

            if(ress.data.ok) {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {headers: {'x-token': token}})
                
                if(res.data.ok) {
                    const image = res.data.image.url
                    const idImage = res.data.image.id
                    const resp = await fetchConToken(`zoom/${zoom._id}`, {title, date, image, idImage, id, password}, 'PUT');
                    const body = await resp.json()

                    dispatch(createZoom(body))

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
                        title: 'Zoom creado correctamente'
                      })
                    
                }
            }
        } else {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {headers: {'x-token': token}})
            
            if(res.data.ok) {
                const image = res.data.image.url
                const idImage = res.data.image.id
                const resp = await fetchConToken('zoom', {title, date, image, idImage, id, password}, 'POST');
                const body = await resp.json()

                dispatch(createZoom(body))

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