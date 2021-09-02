// Core
import nookies from "nookies"

// Actions
import {userActions} from "../bus/user/actions"

export const initialDispatcher = async (context, store) => {
    const cookies = nookies.get(context)
    if (!cookies.userId) {
        const userId = Date.now().toString()
        store.dispatch(userActions.fillUser(userId))
    } else {
        store.dispatch(userActions.fillUser(cookies.userId))
    }
    return store
}
