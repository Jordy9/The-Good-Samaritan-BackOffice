import { Types } from "../types/Types";

const initialState = {
    Porcentage: 0
}

export const progressBarReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.chbUpload:
            return {
                ...state,
                Porcentage: action.payload
            }

        case Types.chbUploadFinish:
            return {
                ...state,
                Porcentage: 0
            }
    
        default:
            return state;
    }
}