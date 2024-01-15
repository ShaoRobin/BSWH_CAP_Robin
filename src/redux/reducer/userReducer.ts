import { USER_DATA } from "../types";
import { User } from "../../api/interfaces";

export interface UserState {
    userData: User[]
}

const initialstate: UserState = {
    userData: []
}

type Action = {
    type: string,
    payload?: User[]
}

export default (state: UserState = initialstate, action: Action) :UserState => {
    switch (action.type) {
        case USER_DATA:
            return {
                ...state,
                userData: action.payload || []
            }
        default:
            return state
    }
}