// Core
import Link from "next/link"
// Actions
import {userActions} from "../bus/user/actions"
import {newsActions} from "../bus/news/actions"
import {carsActions} from "../bus/cars/actions"
import {discountsActions} from "../bus/discounts/actions"
// Components
import {Navbar} from "../shared/Navbar"
import {NewsLinks} from "../components/NewsLinks"
import {DiscountsLinks} from "../components/DiscountsLinks"
import {CarsLinks} from "../components/CarsLinks"
// Other
import {getNews, getDiscounts, getCars} from "../helpers/getData"
import {updateUsers} from "../helpers/updateUsers"
import {initialDispatcher} from "../init/initialDispatcher"
import {initializeStore} from "../init/store"
import {FAMILY_VISITS_COUNT, FRIEND_VISITS_COUNT} from "../init/constants"
// Styles
import styles from "../styles/utils.module.css"
import {useDispatch} from "react-redux";

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore())
    const counts = await updateUsers(context, store)
    store.dispatch(userActions.setVisitCounts(counts))
    store.dispatch(userActions.setUserType(counts))
    const news = await getNews()
    store.dispatch(newsActions.updateNews(news))
    let discounts = await getDiscounts()
    store.dispatch(discountsActions.updateDiscounts(discounts))
    let cars = await getCars()
    store.dispatch(carsActions.updateCars(cars))

    const initialReduxState = store.getState()
    return {props: {initialReduxState}}
}

const Dashboard = ({initialReduxState}) => {
    const {news, discounts, cars, user} = initialReduxState
    const dispatch = useDispatch()
    dispatch(newsActions.updateNews(news.news))
    dispatch(discountsActions.updateDiscounts(discounts.discounts))
    dispatch(carsActions.updateCars(cars.cars))
    const initialVisits = user.visitCounts
    dispatch(userActions.setVisitCounts(initialVisits))
    dispatch(userActions.setUserType(initialVisits))

    return (<>
            <Navbar/>
            <h1 className={styles.title}>Links to all application pages:</h1>
            <NewsLinks />
            <DiscountsLinks />
            <CarsLinks />
            <Link href="/"><a className={styles.dblock}>Home page</a></Link>
            <Link href="/dashboard"><a className={styles.dblock}>Dashboard page</a></Link>
            <Link href="/user"><a className={styles.dblock}>User page</a></Link>
        </>
    )
}

export default Dashboard