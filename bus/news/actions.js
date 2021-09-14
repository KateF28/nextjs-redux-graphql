import { types } from "./types"

export const newsActions = {
  updateNews: (news) => {
    return {
      type: types.UPDATE_NEWS,
      payload: news,
    }
  },
}
