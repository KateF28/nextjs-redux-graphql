// Core
import {useDispatch} from "react-redux"
// Components
import {Message} from "../components/Message"
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

    let greeting = "Hello newcomer!"
    if (counts > 2) {
        greeting = "Hello friend!"
    }
    if (counts > 4) {
        greeting = "Welcome to our family!"
    }

    const initialReduxState = store.getState()
    return {props: {greeting, initialReduxState}}
}

const Home = ({greeting, initialReduxState}) => {
    const initialVisits = initialReduxState.user.visitCounts
    const dispatch = useDispatch()
    dispatch(userActions.setVisitCounts(initialVisits))

    return (
        <Message greeting={greeting}/>
    )
}

export default Home
