import { Types } from "../types/Types";

const initialState = {
    Video: '',
    activeVideo: ''
}

export const noBeleaverReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.nbgetVideo:
            return {
                ...state,
                Video: action.payload
            }

        case Types.nbcreateVideo:
            return {
                ...state,
                Video: action.payload
            }

        case Types.nbSetVideo:
            return {
                ...state,
                activeVideo: action.payload
            }

        case Types.nbClearSetVideo:
            return {
                ...state,
                activeVideo: null
            }
    
        default:
            return state;
    }
}
