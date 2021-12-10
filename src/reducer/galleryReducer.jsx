import { Types } from "../types/Types";

const initialState = {
    Gallery: null,
    activeGallery: ''
}

export const galleryReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.gagetGallerys:
            return {
                ...state,
                Gallery: action.payload
            }

        case Types.gacreateGallery:
            return {
                ...state,
                Gallery: [
                    ...state.Gallery,
                    action.payload
                ]
            }

        case Types.gaSetGallery:
            return {
                ...state,
                activeGallery: action.payload
            }

        case Types.gaClearSetGallery:
            return {
                ...state,
                activeGallery: null
            }

        case Types.gaUpdateGallery:
            return {
                ...state,
                Gallery: state.Gallery.map(
                    e => (e.id ===  action.payload.id) ? action.payload : e
                )
            }  
            
        case Types.gaDeleteGallery:
            return {
                ...state,
                Gallery: state.Gallery.filter( 
                    e => (e.id !== state.activeGallery.id)
                ),
                activeSerie: null
            }
    
        default:
            return state;
    }
}
