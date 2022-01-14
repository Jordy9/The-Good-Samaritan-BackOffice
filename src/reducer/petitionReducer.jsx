import { Types } from "../types/Types";

const initialState = {
    Peticiones: null,
    PeticionesUser: null,
    PeticionSinCuenta: null,
    activePetitions: '',
    activePetitionesUser: '',
    activePetitionSinCuenta: '',
    Paginate: [],
    PaginateUser: [],
    PaginateSinCuenta: []
}

export const petitionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.ptgetPetitions:
            return {
                ...state,
                Peticiones: action.payload
            }

        case Types.ptgetPetitionesUser:
            return {
                ...state,
                PeticionesUser: action.payload
            }

        case Types.ptgetPetitionSinCuenta:
            return {
                ...state,
                PeticionSinCuenta: action.payload
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

        case Types.ptSetPetitionesUser:
            return {
                ...state,
                activePetitionesUser: action.payload
            }

        case Types.ptSetPetitionSinCuenta:
            return {
                ...state,
                activePetitionSinCuenta: action.payload
            }

        case Types.ptPaginatePetition:
            return {
                ...state,
                Paginate: action.payload
            }

        case Types.ptPaginatePetitionUser:
            return {
                ...state,
                PaginateUser: action.payload
            }

        case Types.ptPaginatePetitionSinCuenta:
            return {
                ...state,
                PaginateSinCuenta: action.payload
            }

        case Types.ptClearSetPetition:
            return {
                ...state,
                activePetitions: ''
            }

        case Types.ptUpdatePetition:
            return {
                ...state,
                Peticiones: state.Peticiones.map(
                    e => (e._id ===  action.payload._id) ? action.payload : e
                )
            }  
            
        case Types.ptDeletePetition:
            return {
                ...state,
                Peticiones: state.Peticiones.filter( 
                    e => (e._id !== state.activePetitions._id)
                ),
                activePetitions: ''
            }

        case Types.ptDeletePetitionesUser:
            return {
                ...state,
                PeticionesUser: state.PeticionesUser.filter( 
                    e => (e._id !== state.activePetitionesUser._id)
                ),
                activePetitionesUser: ''
            }

        case Types.ptDeletePetitionSinCuenta:
            return {
                ...state,
                PeticionSinCuenta: state.PeticionSinCuenta.filter( 
                    e => (e._id !== state.activePetitionSinCuenta._id)
                ),
                activePetitionSinCuenta: ''
            }
    
        default:
            return state;
    }
}
