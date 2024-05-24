
import Image from "next/image";
import Link from "next/link";
import styles from '../../ui/Dashboard/users/users.module.css'
import Imageuser from '../../../public/image/userImage.png';
import Search from "../../ui/Dashboard/search/Search";
import Pagination from "../../ui/Dashboard/Pagination/Pagination";


export default function Users() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="search for a users..."/>
        <Link href='/Dashboard/Users/Add'>
        <button className={styles.buttonAdd}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
       <thead>
       <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
        </tr>
       </thead>
       <tbody>
            <tr>
              <td>
                <div className={styles.user}>
                  <Image
                    src={Imageuser}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                </div>
              </td>
              <td>email</td>
              <td>created</td>
              <td>Admin</td>
              <td>Active</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={"/Dashboard/Users/id"}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                </div>
              </td>
            </tr>
        </tbody>
      </table>
      <Pagination />
    </div>
  )
}
