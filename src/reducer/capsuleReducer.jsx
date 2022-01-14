import { Types } from "../types/Types";

const initialState = {
    Capsules: null,
    activeCapsule: '',
    Paginate: []
}

export const capsulesReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.cagetCapsules:
            return {
                ...state,
                Capsules: action.payload
            }

        case Types.catcreateCapsule:
            return {
                ...state,
                Capsules: [
                    ...state.Capsules,
                    action.payload
                ]
            }

        case Types.catSetCapsule:
            return {
                ...state,
                activeCapsule: action.payload
            }

        case Types.caPaginateCapsule:
            return {
                ...state,
                Paginate: action.payload
            }

        case Types.catClearSetCapsule:
            return {
                ...state,
                activeCapsule: null
            }

        case Types.catUpdateCapsule:
            return {
                ...state,
                Capsules: state.Capsules.map(
                    e => (e._id ===  action.payload._id) ? action.payload : e
                )
            }  
            
        case Types.catDeleteCapsule:
            return {
                ...state,
                Capsules: state.Capsules.filter( 
                    e => (e._id !== state.activeCapsule._id)
                ),
                activeSerie: null
            }
    
        default:
            return state;
    }
}
