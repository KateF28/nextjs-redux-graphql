import {useSelector} from "react-redux"

export const Message = ({greeting}) => {
    const { user } = useSelector((state) => state)

    return (
        <>
            <h1>{greeting}</h1>
            <p>Visits: {user.visitCounts}</p>
        </>
    )
}
