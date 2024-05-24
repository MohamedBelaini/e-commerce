import styles from './card.module.css'
import { MdSupervisedUserCircle } from "react-icons/md";

export default function Card() {
  return (
    <div className={styles.container}>
       <MdSupervisedUserCircle size={24} />
       <div className={styles.texts}>
        <span className={styles.title}>Totale Users</span>
        <span className={styles.number}>1284</span>
        <span className={styles.detail}>
          <span className={styles.positive}>12%</span>
          slm labas 3elik hani lia
        </span>
       </div>
    </div>
  )
}
