import styles from '../../ui/Dashboard/Prodects/prodects.module.css'
import Search from '../../ui/Dashboard/search/Search'
import Link from 'next/link'
import Image from 'next/image'
import Pagination from '../../ui/Dashboard/Pagination/Pagination'

export default function Prodect() {
  return (
    <div className={styles.container}>
    <div className={styles.top}>
      <Search placeholder="Search for a product..." />
      <Link href="/Dashboard/Prodect/Add">
        <button className={styles.addButton}>Add New</button>
      </Link>
    </div>
    <table className={styles.table}>
      <thead>
        <tr>
          <td>Title</td>
          <td>Description</td>
          <td>Price</td>
          <td>Created At</td>
          <td>Stock</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
          <tr>
            <td>
              <div className={styles.product}>
                <Image
                  src=''
                  alt=""
                  width={40}
                  height={40}
                  className={styles.productImage}
                />
              </div>
            </td>
            <td>dsfdsf</td>
            <td>$200</td>
            <td>hjhjhdsf</td>
            <td>slm lma</td>
            <td>
              <div className={styles.buttons}>
                <Link href='/Dashboard/Prodect/id'>
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
                <form>
                  <input type="hidden" name="id" />
                  <button className={`${styles.button} ${styles.delete}`}>
                    Delete
                  </button>
                </form>
              </div>
            </td>
          </tr>
      </tbody>
    </table>
    <Pagination />
  </div>
  )
}
