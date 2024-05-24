"use client";
// Import necessary Firebase functions
import { db } from '../../../firebaseConfig';
import { collection, doc, setDoc, getDocs, deleteDoc, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React, { useState, useEffect } from 'react';
import styles from '../../../ui/Dashboard/Prodects/addProdects/addProdects.module.css';

export default function AddProdect() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState([]);
  const [price, setPrix] = useState('');
  const [stock, setStock] = useState('');
  const [colors, setColor] = useState([]);
  const [sizes, setSize] = useState([]);
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const GetCategoryData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Categorys'));
        const categoriesData = [];
        querySnapshot.forEach((doc) => {
          categoriesData.push(doc.data().category);
        });
        setCategory(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    GetCategoryData();
  }, []);

  const handleCategorySelect = (e) => {
    setSelectedCategory(e.target.value);
  };

  const uploadImage = async () => {
    if (!image) {
      return null;
    }

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
      return null;
    }
  };

  const AddDataProdect = async (event) => {
    event.preventDefault();
    const downloadURL = await uploadImage();
    if (downloadURL) {
      await saveProduct(downloadURL);
    }
  };

  const saveProduct = async (downloadURL) => {
    try {
      const productRef = doc(collection(db, 'products'));
      const productId = productRef.id; 
      const prixFloat = parseFloat(price);
      const stockFloat = parseFloat(stock);

      await setDoc(productRef, {
        id: productId, 
        title,
        category: selectedCategory,
        price: prixFloat,
        stock: stockFloat,
        colors,
        sizes,
        description,
        image: downloadURL,
      });
      setTitle('');
      setCategory([]);
      setPrix('');
      setStock('');
      setColor([]);
      setSize([]);
      setDescription('');
      setImage(null);
      alert('Add Product is success!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  const handleAddColor = (event) => {
    const newColor = event.target.previousElementSibling.value;
    if (newColor && !colors.includes(newColor)) {
      setColor([...colors, newColor]);
    }
  };

  const handleDeleteColor = (index) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColor(newColors);
  };

  const handleAddCategory = async (event) => {
    const newCategory = event.target.previousElementSibling.value;
    if (newCategory && !category.includes(newCategory)) {
      try {
        await addDoc(collection(db, 'Categorys'), {
          category: newCategory,
        });
        setCategory([...category, newCategory]);
        alert('Success adding category');
      } catch (error) {
        console.error('Error adding category:', error);
        alert('Error adding category');
      }
    }
    event.target.previousElementSibling.value = '';
  };

  const handleDeleteCategory = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Categorys'));
      querySnapshot.forEach(async (doc) => {
        if (doc.data().category === selectedCategory) {
          await deleteDoc(doc.ref);
          setCategory(category.filter((cat) => cat !== selectedCategory));
          setSelectedCategory('');
          alert('Category deleted successfully!');
        }
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category');
    }
  };

  const handleAddSize = (event) => {
    const newSize = event.target.previousElementSibling.value.toUpperCase();
    if (newSize && !sizes.includes(newSize)) {
      setSize([...sizes, newSize]);
    }
    event.target.previousElementSibling.value = '';
  };

  const handleDeleteSize = (index) => {
    const newSizes = sizes.filter((_, i) => i !== index);
    setSize(newSizes);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={AddDataProdect}>
        <input
          className={styles.titleIn}
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className={styles.catego}>
          <input className={styles.catIn} type="text" placeholder="Add new Category" name="category" />
          <button type="button" onClick={handleAddCategory}>Add Category</button>
          <button type="button" onClick={handleDeleteCategory}>Delete Category</button>
          <select
            className={styles.catContainer}
            name="cat"
            id="cat"
            value={selectedCategory}
            onChange={handleCategorySelect}
          >
            {Array.isArray(category) &&
              category.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </div>
        <input
          className={styles.prixIn}
          type="number"
          placeholder="Price"
          value={price}
          name="price"
          required
          onChange={(e) => setPrix(e.target.value)}
        />
        <input
          className={styles.stockIn}
          type="number"
          placeholder="Stock"
          value={stock}
          name="stock"
          required
          onChange={(e) => setStock(e.target.value)}
        />
        <div className={styles.colors}>
          <input type="color" placeholder="Color" name="color" />
          <button type="button" onClick={handleAddColor}>Add Color</button>
          <div className={styles.newColors}>
            {Array.isArray(colors) &&
              colors.map((color, index) => (
                <div className={styles.colorsBtn} key={index}>
                  <span
                    style={{ backgroundColor: color, height: '40px', display: 'inline-block', width: '20%', borderRadius: '10px' }}
                  ></span>
                  <button onClick={() => handleDeleteColor(index)} type="button">Delete</button>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.sizeContainer}>
          <input className={styles.sizeIn} type="text" placeholder="Size" name="size" />
          <button className={styles.addSize} type="button" onClick={handleAddSize}>Add Size</button>
          <div className={styles.sizeContent}>
            {Array.isArray(sizes) &&
              sizes.map((size, index) => (
                <div className={styles.sizeBtn} key={index}>
                  <p
                    style={{
                      border: '1px solid #000',
                      display: 'flex',
                      justifyContent: 'center',
                      backgroundColor: '#000',
                      width: '20%',
                      alignItems: 'center',
                      height: '40px',
                      borderRadius: '10px',
                      color: '#fff',
                    }}
                  >
                    {size}
                  </p>
                  <button className={styles.btns} onClick={() => handleDeleteSize(index)} type="button">Delete</button>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.imageUploadContainer}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} 
            required
          />
          {image && (
            <div>
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className={styles.imagePreview}
              />
              <p>File name: {image.name}</p>
              <p>File size: {(image.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          )}
        </div>
        <textarea
          className={styles.textarea}
          placeholder="Description"
          name="description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className={styles.addProd} type="submit">Add Product</button>
      </form>
    </div>
  );
}
