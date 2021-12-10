import { Types } from "../types/Types";

const initialState = {
    Peticiones: null,
    activePetitions: ''
}

export const petitionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.ptgetPetitions:
            return {
                ...state,
                Peticiones: action.payload
            }

        case Types.ptcreatePetition:
            return {
                ...state,
                Peticiones: [
                    ...state.Peticiones,
                    action.payload
                ]
            }

        case Types.ptSetPetition:
            return {
                ...state,
                activePetitions: action.payload
            }

        case Types.ptClearSetPetition:
            return {
                ...state,
                activePetitions: null
            }

        case Types.ptUpdatePetition:
            return {
                ...state,
                Peticiones: state.Peticiones.map(
                    e => (e.id ===  action.payload.id) ? action.payload : e
                )
            }  
            
        case Types.ptDeletePetition:
            return {
                ...state,
                Peticiones: state.Peticiones.filter( 
                    e => (e.id !== state.activePetitions.id)
                ),
                activeSerie: null
            }
    
        default:
            return state;
    }
}
