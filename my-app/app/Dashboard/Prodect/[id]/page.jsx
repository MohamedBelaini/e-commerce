// SingleProductPage.jsx
"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProduct, updateProduct } from '../../../actions';
import styles from "../../../ui/Dashboard/Prodects/SingleProdect/SingleProdect.module.css";
import Image from 'next/image';

const SingleProductPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProduct = await fetchProduct(id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, {
        title: e.target.title.value,
        price: e.target.price.value,
        stock: e.target.stock.value,
        color: e.target.color.value,
        size: e.target.size.value,
        category: e.target.cat.value,
        description: e.target.desc.value,
      });
      console.log('Product updated successfully!');
      router.push('/dashboard/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className={styles.container}>
      {product ? (
        <>
          <div className={styles.infoContainer}>
            <div className={styles.imgContainer}>
              <Image  src={product.image || "/noproduct.jpg"} alt="" fill />
            </div>
            <h2>{product.title}</h2>
          </div>
          <div className={styles.formContainer}>
            <form onSubmit={handleFormSubmit} className={styles.form}>
              <input type="hidden" name="id" value={product.id} />
              <label>Title</label>
              <input type="text" name="title" defaultValue={product.title} />
              <label>Price</label>
              <input type="number" name="price" defaultValue={product.price} />
              <label>Stock</label>
              <input type="number" name="stock" defaultValue={product.stock} />
              <label>Color</label>
              <input type="text" name="color" defaultValue={product.colors || ''} />
              <label>Size</label>
              <textarea name="size" defaultValue={product.sizes || ''} />
              <label>Cat</label>
              <select name="cat" id="cat" >
                <option value="kitchen" >{product.category || ''}</option>
              </select>
              <label>Description</label>
              <textarea name="desc" rows="10" defaultValue={product.description || ''}></textarea>
            </form>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SingleProductPage;
