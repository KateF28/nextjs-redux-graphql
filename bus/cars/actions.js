import { types } from "./types"

export const carsActions = {
  updateCars: (cars) => {
    return {
      type: types.UPDATE_CARS,
      payload: cars,
    }
  },
}
