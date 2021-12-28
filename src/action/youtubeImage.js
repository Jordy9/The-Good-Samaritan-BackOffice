import { fetchConToken, fetchSinToken } from "../helper/fetch"
import { Types } from "../types/Types"
import Swal from "sweetalert2"


export const startGetYoutube = () => {
    return async(dispatch) => {
        const resp = await fetchSinToken('youtube')
        const body = await resp.json()

        console.log(body)

        if(body.ok) {
            dispatch(Youtube(body.youtube))
        }
    }
}

const Youtube = (youtube) => ({
    type: Types.ytgetYoutube,
    payload: youtube
})

export const startCreateYoutube = (title, urlImage) => {
    return async(dispatch) => {

        console.log(title, urlImage)

        const resp = await fetchConToken('youtube', {title, urlImage}, 'POST');
        const body = await resp.json()

        dispatch(createYoutube(body))
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

export const startUpdateYoutube = (title, urlImage) => {
    return async(dispatch, getState) => {

        const {activeYoutube} = getState().yt

        
        const resp = await fetchConToken(`youtube/${activeYoutube._id}`, {title, urlImage}, 'PUT');
        const body = await resp.json()

        if (body.ok) {

            dispatch(updateYoutube(body.youtube))
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
                title: 'Video actualizado correctamente'
              })
        } else {
            console.log(body.errors)
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
                timer: 10000,
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