import { Types } from "../types/Types";

const initialState = {
    SetUser: ''
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.usSetUser:
            return {
                ...state,
                SetUser: action.payload
            }
    
        default:
            return state;
    }
}
