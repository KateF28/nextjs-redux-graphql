// Core
import {useDispatch} from "react-redux"
// Components
import {User} from "../components/User"
import {Navbar} from "../shared/Navbar"
// Actions
import {userActions} from "../bus/user/actions"
// Other
import {updateUsers} from "../helpers/updateUsers"
import {initialDispatcher} from "../init/initialDispatcher"
import {initializeStore} from "../init/store"

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore())
    const counts = await updateUsers(context, store)
    store.dispatch(userActions.setVisitCounts(counts))
    store.dispatch(userActions.setUserType(counts))

    const initialReduxState = store.getState()
    return {props: {initialReduxState}}
}

const UserPage = ({initialReduxState}) => {
    const initialVisits = initialReduxState.user.visitCounts
    const dispatch = useDispatch()
    dispatch(userActions.setVisitCounts(initialVisits))
    dispatch(userActions.setUserType(initialVisits))

    return (
        <>
            <Navbar/>
            <User/>
        </>
    )
}

export default UserPage