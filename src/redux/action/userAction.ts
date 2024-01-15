import { USER_DATA } from "../types";
import { User } from "../../api/interfaces";

export const setUserData = (payload: User[]) => ({
    type: USER_DATA,
    payload
})
