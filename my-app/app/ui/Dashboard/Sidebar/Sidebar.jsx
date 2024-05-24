
import MenuLink from './menuLink/menuLink';
import styles from './sidebar.module.css'
import Image from 'next/image';
import ImageUser from '../../../../public/image/userImage.png'
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/Dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/Dashboard/Users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "/Dashboard/Prodect",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "/Dashboard/Transactions",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/Dashboard/Revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/Dashboard/Reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/Dashboard/Teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/Dashboard/Settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/Dashboard/Help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];


export default function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image  src={ImageUser}
           className={styles.userImage}
           width={50}
           height={50}
           alt="Picture of the author"
           >
           </Image>
           <div className={styles.userDetail}>
             <span className={styles.userName}>Mohamed Belaini</span>
             <span className={styles.userTitle}>Adiministrator</span>
        </div>
      </div>
     
      <ul className={styles.list}>
        {menuItems.map(item => 
          <li key={item.title}>
            <span className={styles.cat}>{item.title}</span>
             {item.list.map(eve => 
             <MenuLink eve={eve} key={eve.title}/>
             )}
          </li>
          )}
      </ul>
      <button className={styles.logout}>
      <MdLogout />
        Logout
      </button>
    </div>
  )
}
