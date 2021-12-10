import { Types } from "../types/Types";


export const SetActiveUser = (id, user) => ({
    type: Types.usSetUser,
    payload: {
        id,
        ...user
    }
});