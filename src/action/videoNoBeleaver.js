import { fetchConToken, fetchSinToken } from "../helper/fetch"
import axios from 'axios'
import { Types } from "../types/Types"
import Swal from "sweetalert2"



export const startGetNoBeleaverVideo = () => {
    return async(dispatch) => {
        const resp = await fetchSinToken('VideoNoBeleaver')
        const body = await resp.json()

        if(body.ok) {
            dispatch(NoBeleaverVideo(body.videoNoBeleaver))
        }
    }
}

const NoBeleaverVideo = (video) => ({
    type: Types.nbgetVideo,
    payload: video
})

export const startCreateNoBeleaverVideo = (title, file) => {
    return async(dispatch, getState) => {

        const {Video} = getState().nb

        const video = Video[0]

        const token = localStorage.getItem('token') || '';

        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', title)

        if(video) {

            const ress = await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${video.idImage}`, {headers: {'x-token': token}})
            
            if(ress.data.ok) {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {headers: {'x-token': token}})
                
                if(res.data.ok) {
                    const image = res.data.image.url
                    const idImage = res.data.image.id
                    const resp = await fetchConToken(`VideoNoBeleaver/${video._id}`, {title, image, idImage}, 'PUT');
                    const body = await resp.json()

                    dispatch(createNoBeleaverVideo(body.videoNoBeleaverGuardado))
                    dispatch(startGetNoBeleaverVideo())

                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: true,
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
                    
                }
            }
        } else {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {headers: {'x-token': token}})
            
            if(res.data.ok) {
                const image = res.data.image.url
                const idImage = res.data.image.id
                const resp = await fetchConToken('VideoNoBeleaver', {title, image, idImage}, 'POST');
                const body = await resp.json()

                dispatch(createNoBeleaverVideo(body.videoNoBeleaverGuardado))
                dispatch(startGetNoBeleaverVideo())
                
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
                
            }
        }
    }
}

const createNoBeleaverVideo = (zoom) => ({
    type: Types.nbcreateVideo,
    payload: zoom
})

export const SetActiveNoBeleaverVideo = (zoom) => ({
    type: Types.nbSetVideo,
    payload: zoom
});

export const clearSetNoBeleaverVideo = (zoom) => ({
    type: Types.nbClearSetVideo,
    payload: zoom
});