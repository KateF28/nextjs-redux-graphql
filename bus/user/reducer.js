import { types } from "./types"

const initialState = {
  userId: '',
  // accessible user types: 'guest', 'friend', 'familyMember'
  userType: 'guest',
  visitCounts: 0,
}

export const userReducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case types.FILL_USER:
      return {...state, userId: payload}
    case types.SET_COUNTS:
      return {...state, visitCounts: payload}
    case types.SET_TYPE:
      return {...state, userType: payload}

    default:
      return state
  }
}