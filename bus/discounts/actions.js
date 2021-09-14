import { types } from "./types"

export const discountsActions = {
  updateDiscounts: (discounts) => {
    return {
      type: types.UPDATE_DISCOUNTS,
      payload: discounts,
    }
  },
}
