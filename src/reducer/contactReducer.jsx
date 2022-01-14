import { Types } from "../types/Types";

const initialState = {
    Contactos: null,
    activeContact: '',
    Paginate: []
}

export const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.cogetContacts:
            return {
                ...state,
                Contactos: action.payload
            }

        case Types.coSetContact:
            return {
                ...state,
                activeContact: action.payload
            } 

        case Types.coPaginateContact:
            return {
                ...state,
                Paginate: action.payload
            } 
            
        case Types.coDeleteContact:
            return {
                ...state,
                Contactos: state.Contactos.filter( 
                    e => (e._id !== state.activeContact._id)
                ),
                activeSerie: null
            }
    
        default:
            return state;
    }
}
