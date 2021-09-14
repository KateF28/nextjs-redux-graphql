// Core
import {Provider} from 'react-redux'
// Other
import {useStore} from '../init/store'
// Styles
import styles from "../styles/global.css"

function MyApp({Component, pageProps}) {
    const store = useStore(pageProps.initialReduxState)

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp
