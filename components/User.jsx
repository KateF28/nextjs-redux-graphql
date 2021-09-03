// Core
import {useSelector, shallowEqual, useDispatch} from "react-redux"
// Actions
import {userActions} from "../bus/user/actions"
// Other
import {USER_TYPES} from "../init/constants"

export const User = () => {
    const {visitCounts, userType} = useSelector(({user}) => user, shallowEqual)
    const dispatch = useDispatch()
    const setTemporaryHigherStatus = () => {
        dispatch(userActions.setTemporaryType(userType === USER_TYPES.guest ? USER_TYPES.friend : USER_TYPES.family))
    }

    return (
        <>
            <p>User type: {userType}</p>
            <p>Visits: {visitCounts}</p>
            <button type="button" onClick={setTemporaryHigherStatus}>Set temporary higher status</button>
        </>
    )
}