import {types} from "./types"
import {FRIEND_VISITS_COUNT, FAMILY_VISITS_COUNT, USER_TYPES} from "../../init/constants"

const initialState = {
    userId: '',
    userType: USER_TYPES.guest,
    visitCounts: 0,
    temporaryType: "",
}

const defineUserType = (counts, temporaryType) => {
    if (temporaryType.length > 0) {
        return (temporaryType === USER_TYPES.friend && counts < FAMILY_VISITS_COUNT) ? USER_TYPES.friend : USER_TYPES.family
    } else {
        return (counts >= FRIEND_VISITS_COUNT && counts < FAMILY_VISITS_COUNT) ? USER_TYPES.friend : (counts >= FAMILY_VISITS_COUNT) ? USER_TYPES.family : USER_TYPES.guest
    }
}

export const userReducer = (
    state = initialState,
    {type, payload},
) => {
    switch (type) {
        case types.FILL_USER:
            return {...state, userId: payload}
        case types.SET_COUNTS:
            return {...state, visitCounts: payload}
        case types.SET_TYPE:
            return {...state, userType: defineUserType(payload, state.temporaryType)}
        case types.SET_TEMPORARY_TYPE:
            return {...state, temporaryType: payload, userType: payload}

        default:
            return state
    }
}