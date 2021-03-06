import { Types } from "../types/Types";

const initialState = {
    Gallery: null,
    activeGallery: '',
    Paginate: [],
    Porcentage: 0
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

        case Types.gaPaginateGallery:
            return {
                ...state,
                Paginate: action.payload
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
                    e => (e._id ===  action.payload._id) ? action.payload : e
                ),
                activeGallery: action.payload
            }  
            
        case Types.gaDeleteGallery:
            return {
                ...state,
                Gallery: state.Gallery.filter( 
                    e => (e._id !== state.activeGallery._id)
                ),
                activeSerie: null
            }

        case Types.gaUpload:
            return {
                ...state,
                Porcentage: action.payload
            }

        case Types.gaUploadFinish:
            return {
                ...state,
                Porcentage: 0
            }
    
        default:
            return state;
    }
}
