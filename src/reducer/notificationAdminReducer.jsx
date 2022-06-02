import { Types } from "../types/Types";

const initialState = {
    notificaciones: [],
    updateNotifications: null
}

export const notificationAdminReducer  = (state = initialState, action) => {
    switch (action.type) {
        case Types.NUgetnotificationsAdmin:
            return {
                ...state,
                notificaciones: [...action.payload]
            }

        case Types.NUupdateNotificationsAdmin:
            return {
                ...state,
                updateNotifications: action.payload
            }

        case Types.NUupdateNotificationsAdminUpdate:
            return {
                ...state,
                notificaciones: state.notificaciones.map(
                    e => (e._id ===  action.payload._id) ? action.payload : e
                )
            }
    
        default:
            return state;
    }
}