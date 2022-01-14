import { Types } from "../types/Types";

const initialState = {
    Zoom: '',
    activeZoom: ''
}

export const zoomReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.zmgetZooms:
            return {
                ...state,
                Zoom: action.payload
            }

        case Types.zmcreateZoom:
            return {
                ...state,
                Zoom: [
                    ...state.Zoom,
                    action.payload
                ]
            }

        case Types.zmSetZoom:
            return {
                ...state,
                activeZoom: action.payload
            }

        // case Types.evClearSetEvent:
        //     return {
        //         ...state,
        //         activeZoom: null
        //     }

        // case Types.evUpdateEvent:
        //     return {
        //         ...state,
        //         Zoom: state.Zoom.map(
        //             e => (e.id ===  action.payload.id) ? action.payload : e
        //         )
        //     }  
            
        // case Types.evDeleteEvent:
        //     return {
        //         ...state,
        //         Zoom: state.Zoom.filter( 
        //             e => (e.id !== state.activeZoom.id)
        //         ),
        //         activeSerie: null
        //     }
    
        default:
            return state;
    }
}