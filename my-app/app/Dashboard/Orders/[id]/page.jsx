// SingleOrderPage.jsx
"use client"
import React, { useState, useEffect } from 'react';
import { fetchOrders } from '../../../actions';
import styles from "../../../ui/Dashboard/Prodects/SingleProdect/SingleProdect.module.css";
import Image from 'next/image';

const SingleOrderPage = ({ params }) => {
  const { id } = params;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedOrders = await fetchOrders();
        const selectedOrder = fetchedOrders.find(order => order.id === id);
        setOrder(selectedOrder);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className={styles.container}>
      {order ? (
        <>
          <div className={styles.infoContainer}>
            <div className={styles.imgContainer}>
              <Image src={order.image || "/noproduct.jpg"} alt="" fill />
            </div>
            <h2>{order.fullName}</h2>
          </div>
          <div className={styles.formContainer}>
            <form className={styles.form}>
              <label>Full Name:</label>
              <input type="text" readOnly value={order.fullName} />
              <label>Product ID:</label>
              <input type="text" readOnly value={order.productId} />
              <label>Title:</label>
              <input type="text" readOnly value={order.title} />
              <label>Price:</label>
              <input type="number" readOnly value={order.price} />
              <label>Description:</label>
              <textarea readOnly value={order.description} />
              <label>Size:</label>
              <input type="text" readOnly value={order.size} />
              <label>Category:</label>
              <input type="text" readOnly value={order.category} />
              <label>Color:</label>
              <input type="text" readOnly value={order.color} />
              <label>Quantity:</label>
              <input type="number" readOnly value={order.quantity} />
              <label>Shipping Address:</label>
              <input type="text" readOnly value={order.shippingAddress} />
              <label>Phone Number:</label>
              <input type="text" readOnly value={order.phoneNumber} />
              <label>Email:</label>
              <input type="email" readOnly value={order.email} />
              <label>Time:</label>
              <input type="text" readOnly value={order.time} />
              <label>Date:</label>
              <input type="text" readOnly value={order.date} />
            </form>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SingleOrderPage;
