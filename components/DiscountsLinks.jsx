// Core
import Link from "next/link"
import {useSelector, shallowEqual} from "react-redux"
// Styles
import styles from "../styles/utils.module.css"

export const DiscountsLinks = () => {
    const {discounts} = useSelector(({discounts}) => discounts, shallowEqual)

    return (
        <>
            <Link href="/discounts"><a className={styles.dblock}>Discounts page</a></Link>
            {discounts.map(discount => {
                    return (
                        <Link href={`/discounts/${encodeURIComponent(discount.id)}`} key={discount.id}>
                            <a className={styles.dblock}>Discount {discount.id} page</a>
                        </Link>
                    )
                }
            )}
        </>
    )
}