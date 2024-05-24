'use client';
import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import styles from '../../ui/Dashboard/Prodects/prodects.module.css';
import Search from '../../ui/Dashboard/search/Search';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from '../../ui/Dashboard/Pagination/Pagination';

export default function Prodect() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      setProducts(products.filter(product => product.id !== productId));
      console.log('Product deleted successfully!');
    } catch (error) {
      alert('Error deleting product');
      console.error('Error deleting product:', error);
    }
  };

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
            <td></td>
            <td>fullName</td>
            <td>Title</td>
            <td>Description</td>
            <td>quantity</td>
            <td>Price</td>
            <td>time</td>
            <td>date</td>
            <td>action</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={product.image || "/noproduct.jpg"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                </div>
              </td>
              <td>fullName</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>quantity</td>
              <td>${product.price}</td>
              <td>time</td>
              <td>date</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/Dashboard/Prodect/${product.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form onSubmit={(e) => { e.preventDefault(); deleteProduct(product.id); }}>
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