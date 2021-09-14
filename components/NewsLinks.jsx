// Core
import Link from "next/link"
import {useSelector, shallowEqual} from "react-redux"
// Styles
import styles from "../styles/utils.module.css"

export const NewsLinks = () => {
    const {news} = useSelector(({news}) => news, shallowEqual)

    return (
        <>
            <Link href="/news"><a className={styles.dblock}>News page</a></Link>
            {news.map(article => {
                    return (
                        <Link href={`/news/${encodeURIComponent(article.id)}`} key={article.id}>
                            <a className={styles.dblock}>Article {article.id} page</a>
                        </Link>
                    )
                }
            )
            }
        </>
    )
}