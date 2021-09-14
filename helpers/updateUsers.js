// Core
import nookies from "nookies"
// Helpers
import {updateUser} from "./updateUser"
import {addUser} from "./addUser"

export const updateUsers = async (context, store) => {
    const cookies = nookies.get(context)
    const initialStore = store.getState()
    const {user: {userId}} = initialStore
    if (!cookies.userId) {
        await addUser(userId)
        nookies.set(context, 'userId', userId, {
            // maxAge: 30 * 24 * 60 * 60,
            path: '/',
        })
        nookies.set(context, 'visitCounts', "1", {
            // maxAge: 30 * 24 * 60 * 60,
            path: '/',
        })
        return 1
    } else {
        const visitCounts = +cookies.visitCounts
        const newVisitCounts = visitCounts + 1
        nookies.set(context, 'visitCounts', newVisitCounts.toString(), {
            // maxAge: 30 * 24 * 60 * 60,
            path: '/',
        })
        await updateUser(userId, newVisitCounts)
        return newVisitCounts
    }
}