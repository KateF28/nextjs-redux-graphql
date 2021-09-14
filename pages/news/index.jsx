// Core
import Link from "next/link"
import {useDispatch} from "react-redux"
// Actions
import {userActions} from "../../bus/user/actions"
// Components
import {Navbar} from "../../shared/Navbar"
// Other
import {getNews} from "../../helpers/getData"
import {updateUsers} from "../../helpers/updateUsers"
import {initialDispatcher} from "../../init/initialDispatcher"
import {initializeStore} from "../../init/store"
// Styles
import styles from "../../styles/utils.module.css"

export const getServerSideProps = async (context) => {
    const store = await initialDispatcher(context, initializeStore())
    const counts = await updateUsers(context, store)
    store.dispatch(userActions.setVisitCounts(counts))
    store.dispatch(userActions.setUserType(counts))
    const news = await getNews()

    const initialReduxState = store.getState()
    return {props: {initialVisits: initialReduxState.user.visitCounts, news}}
}

const News = ({initialVisits, news}) => {
    const dispatch = useDispatch()
    dispatch(userActions.setVisitCounts(initialVisits))
    dispatch(userActions.setUserType(initialVisits))

    return (<>
            <Navbar/>
            <h2 className={styles.title}>News</h2>
            {news.map((article, idx) => {
                    return (
                        <div key={`${idx}-article`}>
                            <h3>{article.content}</h3>
                            <p>{article.dateOfReceiving}</p>
                            <Link href={`/news/${encodeURIComponent(article.id)}`}>
                                <a>Go to the article &#8594;</a>
                            </Link>
                        </div>
                    )
                }
            )}
        </>
    )
}

export default News