import { Types } from "../types/Types";

const initialState = {
    miniSeries: null,
    activeSerie: '',
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

        case Types.miClearSetSerie:
            return {
                ...state,
                activeSerie: null
            }

        case Types.miUpdateSerie:
            return {
                ...state,
                miniSeries: state.miniSeries.map(
                    e => (e.id ===  action.payload.id) ? action.payload : e
                )
            }  
            
        case Types.miDeleteSerie:
            return {
                ...state,
                miniSeries: state.miniSeries.filter( 
                    e => (e.id !== state.activeSerie.id)
                ),
                activeSerie: null
            }
    
        default:
            return state;
    }
}
