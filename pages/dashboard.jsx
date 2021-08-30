import {getNews, getDiscounts, getCars} from "../helpers/updateDashboard"
import {updateUsers} from "../helpers/updateUsers"
import styles from "../styles/dashboard.module.css"

export const getServerSideProps = async (context) => {
    const news = await getNews()
    const counts = await updateUsers(context)
    let discounts = []
    let cars = []

    if (counts > 2) {
        discounts = await getDiscounts()
    }
    if (counts > 4) {
        cars = await getCars()
    }
    return {props: {news, discounts, cars}}
}

const Dashboard = ({news, discounts, cars}) => {
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