// Core
import {useSelector, shallowEqual} from "react-redux"
// Other
import {USER_TYPES} from "../init/constants"

export const Message = () => {
    const {visitCounts, userType} = useSelector(({user}) => user, shallowEqual)

    return (
        <>
            <h1>{userType === USER_TYPES.family ? "Welcome to our family!" : userType === USER_TYPES.friend ? "Hello friend!" : "Hello newcomer!"}</h1>
            <p>Visits: {visitCounts}</p>
        </>
    )
}
