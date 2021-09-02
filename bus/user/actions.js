import { types } from "./types"

export const userActions = {
  fillUser: (userId) => {
    return {
      type: types.FILL_USER,
      payload: userId,
    }
  },
  setVisitCounts: (visitCounts) => {
    return {
      type: types.SET_COUNTS,
      payload: visitCounts,
    }
  },
  setUserType: (userType) => {
    return {
      type: types.SET_TYPE,
      payload: userType,
    }
  },
}
