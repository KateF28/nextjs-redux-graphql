// Core
import {useRouter} from 'next/router'
import {useMemo} from "react"
import {useDispatch} from "react-redux"
// Actions
import {userActions} from "../../bus/user/actions"
// Components
import {Navbar} from "../../shared/Navbar"
import {Backlink} from "../../shared/Backlink"
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

const Article = ({initialVisits, news}) => {
    const router = useRouter()
    const {id} = router.query
    const article = useMemo(() => news.find(article => article.id === id), [news, id])
    const dispatch = useDispatch()
    dispatch(userActions.setVisitCounts(initialVisits))
    dispatch(userActions.setUserType(initialVisits))

    return (<>
            <Navbar/>
            <Backlink/>
            <h2 className={styles.title}>Article {article.id}</h2>
            <div>
                <h3>{article.content}</h3>
                <p>{article.dateOfReceiving}</p>
            </div>
        </>
    )
}

export default Article