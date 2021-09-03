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
  setUserType: (visitCounts) => {
    return {
      type: types.SET_TYPE,
      payload: visitCounts,
    }
  },
  setTemporaryType: (type) => {
    return {
      type: types.SET_TEMPORARY_TYPE,
      payload: type,
    }
  },
}
