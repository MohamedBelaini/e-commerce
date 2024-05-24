"use client"
import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import styles from '../../ui/Dashboard/Prodects/prodects.module.css';
import Search from '../../ui/Dashboard/search/Search';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from '../../ui/Dashboard/Pagination/Pagination';

export default function Prodect() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'orders'));
        const ordersData = [];
        querySnapshot.forEach((doc) => {
          ordersData.push({ id: doc.id, ...doc.data() });
        });
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      await deleteDoc(doc(db, 'orders', orderId));
      setOrders(orders.filter(order => order.id !== orderId));
      console.log('Order deleted successfully!');
    } catch (error) {
      alert('Error deleting order');
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for an order..." />
        <Link href="/Dashboard/Orders/Add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td></td>
            <td>Title</td>
            <td>Description</td>
            <td>Quantity</td>
            <td>Price</td>
            <td>Time</td>
            <td>Date</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={order.image || "/noproduct.jpg"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                </div>
              </td>
              <td>{order.title}</td>
              <td>{order.description}</td>
              <td>{order.quantity}</td>
              <td>${order.price}</td>
              <td>{order.time}</td>
              <td>{order.date}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/Dashboard/Orders/${order.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form onSubmit={(e) => { e.preventDefault(); deleteOrder(order.id); }}>
                    <button type="submit" className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}
