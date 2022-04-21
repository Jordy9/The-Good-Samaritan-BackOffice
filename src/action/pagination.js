import { Types } from "../types/Types"


export const ActivePaginate = (number) => ({
    type: Types.pgrActivePaginate,
    payload: number
})

export const clearActivePaginate = () => ({
    type: Types.pgrClearActivePaginate
})