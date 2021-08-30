import {updateUsers} from "../helpers/updateUsers"

export const getServerSideProps = async (context) => {
  let greeting = "Hello newcomer!"
  const counts = await updateUsers(context)
  if (counts > 2) {
    greeting = "Hello friend!"
  }
  if (counts > 4) {
    greeting = "Welcome to our family!"
  }

  return { props: { greeting } }
}

const Home = ({greeting}) => {
  return (
      <h1>{greeting}</h1>
  )
}

export default Home
