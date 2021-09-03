// Components
import {NavLink} from "./Navlink"

export const Navbar = () => {
    return (
        <>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/user">User</NavLink>
        </>
    )
}
