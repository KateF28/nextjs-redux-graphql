// Core
import Link from "next/link"
import {useSelector, shallowEqual} from "react-redux"
// Styles
import styles from "../styles/utils.module.css"

export const CarsLinks = () => {
    const {cars} = useSelector(({cars}) => cars, shallowEqual)

    return (
        <>
            <Link href="/cars"><a className={styles.dblock}>Cars page</a></Link>
            {cars.map(car => (
                    <Link href={`/cars/${encodeURIComponent(car.id)}`} key={car.id}>
                        <a className={styles.dblock}>Car {car.id} page</a>
                    </Link>
                )
            )}
        </>
    )
}