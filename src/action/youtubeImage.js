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

export const startCreateYoutube = (title, date, urlImage) => {
    return async(dispatch) => {

        const resp = await fetchConToken('youtube', {title, date, urlImage}, 'POST');
        const body = await resp.json()

        dispatch(createYoutube(body))
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

export const startUpdateYoutube = (title, date, urlImage) => {
    return async(dispatch, getState) => {

        const {activeYoutube} = getState().yt
        
        const resp = await fetchConToken(`youtube/${activeYoutube._id}`, {title, date, urlImage}, 'PUT');
        const body = await resp.json()

        if (body.ok) {

            dispatch(updateYoutube(body.youtube))
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
            Swal.fire('Error', body.errors, 'error')
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

        const resp = await fetchConToken(`youtube/${activeYoutube._id}`, activeYoutube, 'DELETE')

        if(resp.ok) {
            dispatch(deleteYoutube(activeYoutube))
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
        }
    }

}

const deleteYoutube = (youtube) => ({
    type: Types.ytDeleteYoutube,
    payload: youtube
})