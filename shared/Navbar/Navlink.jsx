// Core
import {useRouter} from "next/router"
import Link from "next/link"

export const NavLink = ({children, href}) => {
    const router = useRouter()
    const style = {
        marginRight: 10,
        color: router.pathname === href ? 'gray' : 'black',
    }

    return (
        <Link href={href}>
            <a style={style}>
                {children}
            </a>
        </Link>
    )
}