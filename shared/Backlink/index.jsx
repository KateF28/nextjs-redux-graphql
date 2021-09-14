// Core
import { useRouter } from 'next/router'
// Styles
import styles from "../../styles/utils.module.css"

export const Backlink = () => {
  const router = useRouter()

  return <span onClick={() => router.back()} className={styles.dblock}>&#8592; Click here to go back</span>
}
