import { Types } from "../types/Types";

const initialState = {
    Mains: null,
    activeMain: '',
    Paginate: []
}

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.magetMains:
            return {
                ...state,
                Mains: action.payload
            }

        case Types.macreateMain:
            return {
                ...state,
                Mains: [
                    ...state.Mains,
                    action.payload
                ]
            }

        case Types.maSetMain:
            return {
                ...state,
                activeMain: action.payload
            }

        case Types.maPaginateMain:
            return {
                ...state,
                Paginate: action.payload
            }

        case Types.maClearSetMain:
            return {
                ...state,
                activeMain: null
            }

        case Types.maUpdateMain:
            return {
                ...state,
                Mains: state.Mains.map(
                    e => (e._id ===  action.payload._id) ? action.payload : e
                )
            }  
            
        case Types.maDeleteMain:
            return {
                ...state,
                Mains: state.Mains.filter( 
                    e => (e._id !== state.activeMain._id)
                ),
                activeSerie: null
            }
    
        default:
            return state;
    }
}