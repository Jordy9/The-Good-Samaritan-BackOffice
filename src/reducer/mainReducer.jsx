import { Types } from "../types/Types";

const initialState = {
    Mains: null,
    activeMain: ''
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

        case Types.maClearSetMain:
            return {
                ...state,
                activeMain: null
            }

        case Types.maUpdateMain:
            return {
                ...state,
                Mains: state.Mains.map(
                    e => (e.id ===  action.payload.id) ? action.payload : e
                )
            }  
            
        case Types.maDeleteMain:
            return {
                ...state,
                Mains: state.Mains.filter( 
                    e => (e.id !== state.activeMain.id)
                ),
                activeSerie: null
            }
    
        default:
            return state;
    }
}
