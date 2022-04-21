import { Types } from "../types/Types";

const initialState = {
    activePage: 0
}

export const paginationReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.pgrActivePaginate:
            return {
                activePage: action.payload
            }

        case Types.pgrClearActivePaginate:
            return {
                activePage: 0
            }
    
        default:
            return state;
    }
}
