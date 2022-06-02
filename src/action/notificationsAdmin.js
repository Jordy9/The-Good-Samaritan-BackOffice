import { fetchSinToken } from "../helper/fetch"
import { Types } from "../types/Types"


export const startGetNotificationsAdmin = () => {
    return async(dispatch) => {

        const resp = await fetchSinToken('notificacionAdmin')
        const body = await resp.json()

        if (body.ok) {
            dispatch(getNotificationsAdmin(body.notificationsAdmin))
        }
    }
}

export const StartUpdateNotificationAdmin = (notification) => ({
    type: Types.NUupdateNotificationsAdminUpdate,
    payload: notification
})

const getNotificationsAdmin = (notification) => ({
    type: Types.NUgetnotificationsAdmin,
    payload: notification
})

export const UpdateNotifications = (updateNotifications) => ({
    type: Types.NUupdateNotificationsAdmin,
    payload: updateNotifications
})