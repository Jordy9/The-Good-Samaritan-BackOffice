import { Types } from "../types/Types"

const initialState = {
    videos: [],
    activeVideo: null
}

export const VideoWordOfTheDayReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.vwdgetVideosWordOfTheDay:
            return {
                ...state,
                videos: action.payload
            }

        case Types.vwdcreateVideoWordOfTheDay:
            return {
                ...state,
                videos: [
                    ...state.videos,
                    action.payload
                ]
            }

        case Types.vwdSetVideoWordOfTheDay:
            return {
                ...state,
                activeVideo: action.payload
            }

        // case Types.miPaginateSerie:
        //     return {
        //         ...state,
        //         Paginate: action.payload
        //     }

        case Types.vwdClearSetVideoWordOfTheDay:
            return {
                ...state,
                activeVideo: null
            }

        case Types.vwdUpdateVideoWordOfTheDay:
            return {
                ...state,
                videos: state.videos.map(
                    e => (e._id ===  action.payload._id) ? action.payload : e
                )
            }  
            
        case Types.vwdDeleteVideoWordOfTheDay:
            return {
                ...state,
                videos: state.videos.filter( 
                    e => (e._id !== state.activeVideo._id)
                ),
                activeVideo: null
            }
    
        default:
            return state;
    }
}