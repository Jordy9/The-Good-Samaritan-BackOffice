import { fetchConToken, fetchSinToken } from "../helper/fetch"
import { Types } from "../types/Types"
import Swal from "sweetalert2"

export const startGetPaginateYoutube = (page) => {
    return async(dispatch) => {
        const resp = await fetchSinToken(`youtube/you?page=${page || 1}`)
        const body = await resp.json()

        if(body.ok) {
            dispatch(Youtube(body.youtube))
            dispatch(PaginateYoutube({
                page: body.page,
                total: body.total
            }))
        }
    }
}

const PaginateYoutube = (youtube) => ({
    type: Types.ytPaginateYoutube,
    payload: youtube
})

const Youtube = (youtube) => ({
    type: Types.ytgetYoutube,
    payload: youtube
})

export const startCreateYoutube = (title, urlImage) => {
    return async(dispatch, getState) => {

        const {socket} = getState().sk

        const resp = await fetchConToken('youtube', {title, urlImage}, 'POST');
        const body = await resp.json()

        if (body.ok) {

            dispatch(createYoutube(body))
            const subtitle = 'Nuevo video de youtube agregado'

            const content = body.youtube

            const payload = {title, subtitle, content}

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

const createYoutube = (youtube) => ({
    type: Types.ytcreateYoutube,
    payload: youtube
})

export const SetActiveYoutube = (youtube) => ({
    type: Types.ytSetYoutube,
    payload: youtube
});

export const startUpdateYoutube = (title, urlImage) => {
    return async(dispatch, getState) => {

        const {activeYoutube} = getState().yt

        const {socket} = getState().sk
        
        const resp = await fetchConToken(`youtube/${activeYoutube._id}`, {title, urlImage}, 'PUT');
        const body = await resp.json()

        if (body.ok) {

            dispatch(updateYoutube(body.youtube))
            socket?.emit('notifications-admin-to-user-update', body.youtube)
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

    }
}

const updateYoutube = (youtube) => ({
    type: Types.ytUpdateYoutube,
    payload: youtube
})


export const startDeleteYoutube = () => {
    return async(dispatch, getState) => {
        const {activeYoutube} = getState().yt

        const {socket} = getState().sk

        const resp = await fetchConToken(`youtube/${activeYoutube._id}`, activeYoutube, 'DELETE')
        const body = await resp.json()

        if(body.ok) {
            dispatch(deleteYoutube(activeYoutube))
            socket?.emit('notifications-admin-to-user-delete', activeYoutube._id)
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
                title: 'Video eliminado correctamente'
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

const deleteYoutube = (youtube) => ({
    type: Types.ytDeleteYoutube,
    payload: youtube
})