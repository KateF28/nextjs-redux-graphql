// Core
import {useRouter} from 'next/router'
import {useMemo} from "react"
import {useDispatch} from "react-redux"
import {useEffect} from 'react'
// Actions
import {userActions} from "../../bus/user/actions"
// Components
import {Navbar} from "../../shared/Navbar"
import {Backlink} from "../../shared/Backlink"
// Other
import {getCars} from "../../helpers/getData"
import {updateUsers} from "../../helpers/updateUsers"
import {initialDispatcher} from "../../init/initialDispatcher"
import {initializeStore} from "../../init/store"
import {FAMILY_VISITS_COUNT} from "../../init/constants"
// Styles
import styles from "../../styles/utils.module.css"

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore())
    const counts = await updateUsers(context, store)
    store.dispatch(userActions.setVisitCounts(counts))
    store.dispatch(userActions.setUserType(counts))
    let cars = []
    if (counts >= FAMILY_VISITS_COUNT) {
        cars = await getCars()
    }
    const initialReduxState = store.getState()
    return {props: {initialVisits: initialReduxState.user.visitCounts, cars}}
}

const Car = ({initialVisits, cars}) => {
    const router = useRouter()
    const {id} = router.query

    const car = useMemo(() => {
        return cars.length > 0 && initialVisits >= FAMILY_VISITS_COUNT ? cars.find(car => car.id === id) : null
    }, [cars, id, initialVisits])

    useEffect(() => {
        if (initialVisits < FAMILY_VISITS_COUNT) {
            router.push('/')
        }
    }, [initialVisits])

    const dispatch = useDispatch()
    dispatch(userActions.setVisitCounts(initialVisits))
    dispatch(userActions.setUserType(initialVisits))

    return (<>
            <Navbar/>
            <Backlink/>
            {car && <>
                <h2 className={styles.title}>Car {car.id}</h2>
                <h3>{car.content}</h3>
                <p>{car.dateOfReceiving}</p>
            </>}
        </>
    )
}

export default Car