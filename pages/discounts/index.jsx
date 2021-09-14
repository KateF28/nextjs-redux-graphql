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
import {getDiscounts} from "../../helpers/getData"
import {updateUsers} from "../../helpers/updateUsers"
import {initialDispatcher} from "../../init/initialDispatcher"
import {initializeStore} from "../../init/store"
import {FRIEND_VISITS_COUNT} from "../../init/constants"
// Styles
import styles from "../../styles/utils.module.css"

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore())
    const counts = await updateUsers(context, store)
    store.dispatch(userActions.setVisitCounts(counts))
    store.dispatch(userActions.setUserType(counts))
    let discounts = []
    if (counts >= FRIEND_VISITS_COUNT) {
        discounts = await getDiscounts()
    }

    const initialReduxState = store.getState()
    return {props: {initialVisits: initialReduxState.user.visitCounts, discounts}}
}

const Discounts = ({initialVisits, discounts}) => {
    const dispatch = useDispatch()
    dispatch(userActions.setVisitCounts(initialVisits))
    dispatch(userActions.setUserType(initialVisits))
    const router = useRouter()

    useEffect(() => {
        if (initialVisits < FRIEND_VISITS_COUNT) {
            router.push('/')
        }
    }, [initialVisits])

    const discountsJSX = (discounts.length > 0) && (initialVisits >= FRIEND_VISITS_COUNT) && (
        <>
            {discounts.map((discount, idx) => {
                    return (
                        <div key={`${idx}-discount`}>
                            <h3>{discount.content}</h3>
                            <p>{discount.dateOfReceiving}</p>
                            <Link href={`/discounts/${encodeURIComponent(discount.id)}`}>
                                <a>Go to the discount &#8594;</a>
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
            <h2 className={styles.title}>Discounts</h2>
            {discountsJSX}
        </>
    )
}

export default Discounts
