import { Types } from "../types/Types";

const initialState = {
    miniSeries: null,
    activeSerie: '',
    Paginate: [],
    Porcentage: 0
}

export const miniSeriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.migetSeries:
            return {
                ...state,
                miniSeries: action.payload
            }

        case Types.micreateSerie:
            return {
                ...state,
                miniSeries: [
                    ...state.miniSeries,
                    action.payload
                ]
            }

        case Types.miSetSerie:
            return {
                ...state,
                activeSerie: action.payload
            }

        case Types.miPaginateSerie:
            return {
                ...state,
                Paginate: action.payload
            }

        case Types.miClearSetSerie:
            return {
                ...state,
                activeSerie: null
            }

        case Types.miUpdateSerie:
            return {
                ...state,
                miniSeries: state.miniSeries.map(
                    e => (e._id ===  action.payload._id) ? action.payload : e
                ),
                activeSerie: action.payload
            }  
            
        case Types.miDeleteSerie:
            return {
                ...state,
                miniSeries: state.miniSeries.filter( 
                    e => (e._id !== state.activeSerie._id)
                ),
                activeSerie: null
            }

        case Types.miUpload:
            return {
                ...state,
                Porcentage: action.payload
            }

        case Types.miUploadFinish:
            return {
                ...state,
                Porcentage: 0
            }
    
        default:
            return state;
    }
}
