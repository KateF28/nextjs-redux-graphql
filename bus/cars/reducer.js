import {types} from "./types"

const initialState = {
    cars: []
}

export const carsReducer = (
    state = initialState,
    {type, payload},
) => {
    switch (type) {
        case types.UPDATE_CARS:
            return {...state, cars: payload}

        default:
            return state
    }
}