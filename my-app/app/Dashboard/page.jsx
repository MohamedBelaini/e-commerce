import Chart from "../ui/Dashboard/Chart/Chart";
import Card from "../ui/Dashboard/Card/Card";
import Rigthbar from "../ui/Dashboard/Rigthbar/Rigthbar";
import styles from '../ui/Dashboard/dashbord.module.css'

export default function Dashboard() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <Chart />
      </div>
      <div className={styles.side}>
         <Rigthbar />
      </div>
    </div>
  )
}
