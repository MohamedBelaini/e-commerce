'use client'
import styles from '../../../ui/Dashboard/Prodects/addProdects/addProdects.module.css'
import { db, storage } from '../../../firebaseConfig'
import { addDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import React, { useState, useEffect } from 'react';

export default function AddProdect() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState([]);
  const [prix, setPrix] = useState('');
  const [stock, setStock] = useState('');
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [image, setImage] = useState(null); 

  let date;
  const handlDate = () => {
    date = new Date();
  }
  
  const handleCategorySelect = (e) => {
    setSelectedCategory(e.target.value);
  };

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
  }, [date]); 

  const AddDataProdect = async (event) => {
    event.preventDefault();
    
    let imageURL = '';

    if (image && image.name) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          null,
          (error) => {
            console.error('Error uploading image:', error);
            alert('Error uploading image');
            reject(error);
          },
          async () => {
            imageURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve();
          }
        );
      });
    }

    try {
      await addDoc(collection(db, 'products'), {
        title,
        category,
        prix,
        stock,
        color,
        size,
        description,
        imageURL,
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
  }

  const handleAddColor = (event) => {
    const newColor = event.target.previousElementSibling.value;
    if (newColor && !color.includes(newColor)) {
      setColor([...color, newColor]);
    }
  }

  const handlDelteColore = (index) => {
    const newColors = color.filter((_, i) => i !== index);
    setColor(newColors);
  }

  const handleAddCategory = async (event) => {
    const newCategory = event.target.previousElementSibling.value;
    if (newCategory && !category.includes(newCategory)) {
      setCategory([...category, newCategory]);
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
  }

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
    if (newSize && !size.includes(newSize)) {
      setSize([...size, newSize]);
    }
    event.target.previousElementSibling.value = '';
  }

  const handlDelteSize = (index) => {
    const newSizes = size.filter((_, i) => i !== index);
    setSize(newSizes);
  }

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  }

  return (
    <div className={styles.container} onLoad={handlDate}>
      <form className={styles.form} onSubmit={AddDataProdect}>
        <input className={styles.titleIn} type="text" placeholder="Title" name="title" value={title} required onChange={(e) => { setTitle(e.target.value) }} />
        <div className={styles.catego}>
          <input className={styles.catIn} type="text" placeholder="Add new Category" name="title" />
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
        <input className={styles.prixIn} type="number" placeholder="Price" value={prix} name="price" required onChange={(e) => { setPrix(e.target.value) }} />
        <input className={styles.stockIn} type="number" placeholder="Stock" value={stock} name="stock" required onChange={(e) => { setStock(e.target.value) }} />
        <div className={styles.colors}>
          <input type="color" placeholder="Color" name="color" />
          <button type='button' onClick={handleAddColor}>Add Color</button>
          <div className={styles.newColors}>
            {Array.isArray(color) && color.map((color, index) => (
              <div className={styles.colorsBtn} key={index}>
                <span
                  style={{ backgroundColor: color, height: '40px', display: 'inline-block', width: '20%', borderRadius:"10px" }}
                ></span>
                <button onClick={() => { handlDelteColore(index) }} type='button'>Delete</button>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.sizeContainer}>
          <input className={styles.sizeIn} type="text" placeholder="Size" name="size" />
          <button className={styles.addSize} type='button' onClick={handleAddSize}>Add Size</button>
          <div className={styles.sizeContent}>
            {Array.isArray(size) && size.map((size, index) => (
              <div className={styles.sizeBtn} key={index}>
                <p style={{border: '1px solid #000',display: 'flex',justifyContent:'center', backgroundColor: '#000', width: '20%', alignItems: 'center', height: '40px', borderRadius:"10px" }}>{size}</p>
                <button className={styles.btns} onClick={() => { handlDelteSize(index) }} type='button'>Delete</button>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.imageUploadContainer}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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
          value={description}
          required
          name="desc"
          id="desc"
          rows="16"
          placeholder="Description"
          onChange={(e) => { setDescription(e.target.value) }}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}



               



/* <div className={styles.imageUploadContainer}>
<h4>Add Image: </h4>
<input
  type="file"
  accept="image/*"
  onChange={handleImageUpload}
  placeholder='Add'
/>
{imageUpload && (
  <div>
    <img
      src={URL.createObjectURL(imageUpload)}
      alt="Preview"
      className={styles.imagePreview}
    />
    <p>File name: {imageUpload.name}</p>
    <p>File size: {(imageUpload.size / 1024 / 1024).toFixed(2)} MB</p>
  </div>
)}
</div>
 const handleImageUpload = (event) => {
  const file = event.target.files[0];
  setImageUpload(file);
};
const [imageUpload, setImageUpload] = useState(null);
imageURL: downloadURL,  */
// const handleDeleteCategory = async (categoryId) => {
//   try {
//     await deleteDoc(doc(db, 'Categorys', categoryId));
//     setCategoriesData(categoriesData.filter((category) => category.id !== categoryId));
//     alert('Category deleted successfully');
//   } catch (error) {
//     console.error('Error deleting category:', error);
//     alert('Error deleting category');
//   }
// };

 