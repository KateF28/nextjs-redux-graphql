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

const Discount = ({initialVisits, discounts}) => {
    const router = useRouter()
    const {id} = router.query

    const discount = useMemo(() => {
        return discounts.length > 0 && initialVisits >= FRIEND_VISITS_COUNT ? discounts.find(discount => discount.id === id) : null
    }, [discounts, id, initialVisits])

    useEffect(() => {
        if (initialVisits < FRIEND_VISITS_COUNT) {
            router.push('/')
        }
    }, [initialVisits])

    const dispatch = useDispatch()
    dispatch(userActions.setVisitCounts(initialVisits))
    dispatch(userActions.setUserType(initialVisits))

    return (<>
            <Navbar/>
            <Backlink/>
            {discount && <>
                <h2 className={styles.title}>Discount {discount.id}</h2>
                <h3>{discount.content}</h3>
                <p>{discount.dateOfReceiving}</p>
            </>}
        </>
    )
}

export default Discount