// SingleProductPage.jsx
"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProduct, updateProduct } from '../../../actions';
import styles from "../../../ui/Dashboard/Prodects/SingleProdect/SingleProdect.module.css";
import Image from 'next/image';

const SingleProductPage = ({ params }) => {
//   const router = useRouter();
//   const { id } = params;
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchedProduct = await fetchProduct(id);
//         setProduct(fetchedProduct);
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       }
//     };
//     fetchData();
//   }, [id]);

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateProduct(id, {
//         title: e.target.title.value,
//         price: e.target.price.value,
//         stock: e.target.stock.value,
//         color: e.target.color.value,
//         size: e.target.size.value,
//         category: e.target.cat.value,
//         description: e.target.desc.value,
//       });
//       console.log('Product updated successfully!');
//       router.push('/dashboard/products');
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   };

  return (
    <div className={styles.container}>
      
        <>
          <div className={styles.infoContainer}>
            <div className={styles.imgContainer}>
              <Image  src={"/noproduct.jpg"} alt="" fill />
            </div>
            <h2>slm</h2>
          </div>
          <div className={styles.formContainer}>
            <form /*onSubmit={handleFormSubmit}*/ className={styles.form}>

        <label>Product ID:</label>
        <input type="text" disabled defaultValue={"slm"}/>

        <label>Title:</label>
        <input type="text" readOnly defaultValue={"slm"} />

        <label>Price:</label>
        <input type="number" readOnly defaultValue={"slm"} />

        <label>Description:</label>
        <textarea  readOnly defaultValue={"slm"} />

        <label>Size:</label>
        <input type="text"  readOnly defaultValue={"slm"} />

        <label>Category:</label>
        <input type="text" readOnly defaultValue={"slm"} />

        <label>Color:</label>
        <input type="text" readOnly defaultValue={"slm"} />

        <label>Quantity:</label>
        <input type="number"  readOnly defaultValue={"123"} />

        <label>Shipping Address:</label>
        <input type="text"  readOnly defaultValue={"slm"} />

        <label>Phone Number:</label>
        <input type="text" readOnly defaultValue={"slm"} />

        <label>Full Name:</label>
        <input type="text"  readOnly defaultValue={"slm"} />

        <label>Email:</label>
        <input type="email"  readOnly defaultValue={"slm"} />

        <label>Time:</label>
        <input type="text"  readOnly defaultValue={"slm"} />

        <label>Date:</label>
        <input type="text"  readOnly defaultValue={"slm"} />

            </form>
          </div>
        </>
    </div>
  );
};

export default SingleProductPage;
