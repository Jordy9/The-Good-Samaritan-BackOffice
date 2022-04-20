import { Types } from "../types/Types";

const initialState = {
    SetUser: '',
    activePage: 0
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.usSetUser:
            return {
                ...state,
                SetUser: action.payload
            }

        case Types.authActivePaginate:
            return {
                activePage: action.payload
            }

        case Types.authClearActivePaginate:
            return {
                activePage: 0
            }
    
        default:
            return state;
    }
}
