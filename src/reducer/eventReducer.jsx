import { Types } from "../types/Types";

const initialState = {
    Eventos: null,
    activeEvent: ''
}

export const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.evgetEvents:
            return {
                ...state,
                Eventos: action.payload
            }

        case Types.evcreateEvent:
            return {
                ...state,
                Eventos: [
                    ...state.Eventos,
                    action.payload
                ]
            }

        case Types.evSetEvent:
            return {
                ...state,
                activeEvent: action.payload
            }

        case Types.evClearSetEvent:
            return {
                ...state,
                activeEvent: null
            }

        case Types.evUpdateEvent:
            return {
                ...state,
                Eventos: state.Eventos.map(
                    e => (e.id ===  action.payload.id) ? action.payload : e
                )
            }  
            
        case Types.evDeleteEvent:
            return {
                ...state,
                Eventos: state.Eventos.filter( 
                    e => (e.id !== state.activeEvent.id)
                ),
                activeSerie: null
            }
    
        default:
            return state;
    }
}
