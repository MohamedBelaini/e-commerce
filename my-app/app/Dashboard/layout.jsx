import Sidebar from "../ui/Dashboard/Sidebar/Sidebar"
import Navbar from "../ui/Dashboard/Navbar/Navbar"
import Styles from '../ui/Dashboard/dashbord.module.css'

export default function layout({children}) {
  return (
    <div className={Styles.container}>
        <div className={Styles.menu}>
            <Sidebar />
        </div>
        <div className={Styles.content}>
            <Navbar />
            {children}
        </div>
    </div>
  )
}
