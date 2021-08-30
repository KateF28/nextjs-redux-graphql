import nookies from "nookies"
import {updateUser} from "./updateUser"
import {addUser} from "./addUser"

export const updateUsers = async (context) => {
    const cookies = nookies.get(context)
    if (!cookies.userId) {
        const userId = Date.now()
        await addUser(userId)
        nookies.set(context, 'userId', userId.toString())
        // nookies.set(context, 'userId', userId.toString(), {
            // maxAge: 30 * 24 * 60 * 60,
            // path: '/',
        // })
        nookies.set(context, 'visitCounts', "1")
        // nookies.set(context, 'visitCounts', "1", {
            // maxAge: 30 * 24 * 60 * 60,
            // path: '/',
        // })
        return 1
    } else {
        const visitCounts = +cookies.visitCounts
        const newVisitCounts = visitCounts + 1
        nookies.set(context, 'visitCounts', newVisitCounts.toString())
        // nookies.set(context, 'visitCounts', newVisitCounts.toString(), {
            // maxAge: 30 * 24 * 60 * 60,
            // path: '/',
        // })
        await updateUser(cookies.userId, newVisitCounts)
        return visitCounts
    }
}