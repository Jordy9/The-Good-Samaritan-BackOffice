import { Types } from "../types/Types";

const initialState = {
    Bosquejos: null,
    activeBosquejo: ''
}

export const bosquejosReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.sktgetBosquejos:
            return {
                ...state,
                Bosquejos: action.payload
            }

        case Types.sktcreateBosquejo:
            return {
                ...state,
                Bosquejos: [
                    ...state.Bosquejos,
                    action.payload
                ]
            }

        case Types.sktSetBosquejo:
            return {
                ...state,
                activeBosquejo: action.payload
            }

        case Types.sktClearSetBosquejo:
            return {
                ...state,
                activeBosquejo: null
            }

        case Types.sktUpdateBosquejo:
            return {
                ...state,
                Bosquejos: state.Bosquejos.map(
                    e => (e.id ===  action.payload.id) ? action.payload : e
                )
            }  
            
        case Types.sktDeleteBosquejo:
            return {
                ...state,
                Bosquejos: state.Bosquejos.filter( 
                    e => (e.id !== state.activeBosquejo.id)
                ),
                activeSerie: null
            }
    
        default:
            return state;
    }
}
