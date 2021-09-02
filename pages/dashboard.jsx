// Actions
import {userActions} from "../bus/user/actions"
// Other
import {getNews, getDiscounts, getCars} from "../helpers/getDashboard"
import {updateUsers} from "../helpers/updateUsers"
import {initialDispatcher} from "../init/initialDispatcher"
import {initializeStore} from "../init/store"
// Styles
import styles from "../styles/dashboard.module.css"
import {useDispatch} from "react-redux";

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore())
    const counts = await updateUsers(context, store)
    store.dispatch(userActions.setVisitCounts(counts))

    const news = await getNews()
    let discounts = []
    let cars = []
    if (counts > 2) {
        discounts = await getDiscounts()
    }
    if (counts > 4) {
        cars = await getCars()
    }

    const initialReduxState = store.getState()
    return {props: {news, discounts, cars, initialReduxState}}
}

const Dashboard = (props) => {
    const {news, discounts, cars} = props

    const discountsJSX = discounts.length > 0 && (
        <>
            <h2 className={styles.title}>Discounts</h2>
            {discounts.map((el, idx) => {
                    return (
                        <div className={styles.subpart} key={`${idx}-discount`}>
                            <h3>{el.content}</h3>
                            <p>{el.dateOfReceiving}</p>
                        </div>
                    )
                }
            )}
        </>
    )

    const carsJSX = cars.length > 0 && (
        <>
            <h2 className={styles.title}>Discounts</h2>
            {cars.map((el, idx) => {
                    return (
                        <div className={styles.subpart} key={`${idx}-discount`}>
                            <h3>{el.content}</h3>
                            <p>{el.dateOfReceiving}</p>
                        </div>
                    )
                }
            )}
        </>
    )

    return (<>
            <h2 className={styles.title}>News</h2>
            {news.map((el, idx) => {
                    return (
                        <div className={styles.subpart} key={`${idx}-article`}>
                            <h3>{el.content}</h3>
                            <p>{el.dateOfReceiving}</p>
                        </div>
                    )
                }
            )}
            {discountsJSX}
            {carsJSX}
        </>
    )
}

export default Dashboard