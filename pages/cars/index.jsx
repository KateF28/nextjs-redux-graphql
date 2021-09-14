// Core
import Link from "next/link"
import {useDispatch} from "react-redux"
import {useEffect} from 'react'
import {useRouter} from 'next/router'
// Actions
import {userActions} from "../../bus/user/actions"
// Components
import {Navbar} from "../../shared/Navbar"
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

const Cars = ({initialVisits, cars}) => {
    const dispatch = useDispatch()
    dispatch(userActions.setVisitCounts(initialVisits))
    dispatch(userActions.setUserType(initialVisits))
    const router = useRouter()

    useEffect(() => {
        if (initialVisits < FAMILY_VISITS_COUNT) {
            router.push('/')
        }
    }, [initialVisits])

    const carsJSX = (cars.length > 0) && (initialVisits >= FAMILY_VISITS_COUNT) && (
        <>
            {cars.map((car, idx) => {
                    return (
                        <div key={`${idx}-car`}>
                            <h3>{car.content}</h3>
                            <p>{car.dateOfReceiving}</p>
                            <Link href={`/cars/${encodeURIComponent(car.id)}`}>
                                <a>Go to the car &#8594;</a>
                            </Link>
                        </div>
                    )
                }
            )}
        </>
    )

    return (
        <>
            <Navbar/>
            <h2 className={styles.title}>Cars</h2>
            {carsJSX}
        </>
    )
}

export default Cars
