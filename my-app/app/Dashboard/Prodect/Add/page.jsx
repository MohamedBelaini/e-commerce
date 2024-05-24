'use client'
import styles from '../../../ui/Dashboard/Prodects/addProdects/addProdects.module.css'
import { useState } from 'react'


export default function AddProdect() {

  const [color, setColor] = useState([]);
  const [category, setCatagory] = useState([]);
  const [size, setSize] = useState([]); 

  const handleAddColor = (event) => {
    const newColor = event.target.previousElementSibling.value;
    if (!color.includes(newColor)) {
      setColor([...color, newColor]);
    }
  } 
  const handlAddCategory = (event) => {
    const newCategory = event.target.previousElementSibling.value;
    if (!category.includes(newCategory)) {
      setCatagory([...category, newCategory]);
    }
  }
  const handleAddSize = (event) => {
    const newSize = event.target.previousElementSibling.value;
    const newSizeUpper = newSize.toUpperCase();
    if (!size.includes(newSizeUpper)) {
      setSize([...size, newSizeUpper]);
    }
  }
  
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input className={styles.titleIn} type="text" placeholder="Title" name="title" required />
        <div className={styles.catego}>
        <input className={styles.catIn} type="text" placeholder="Add new Category" name="title" required />
        <button type='button' onClick={handlAddCategory}>Add Category</button>
        <select name="cat" id="cat">
          {category.map((eve, index) => (
               <option style={{padding: '20px'}} key={index} value={eve}>{eve}</option>
            ))}
        </select>
        </div>
        <input className={styles.prixIn} type="number" placeholder="Price" name="price" required />
        <input className={styles.stockIn} type="number" placeholder="Stock" name="stock" required />
        <div className={styles.colors}>
          <input
            type="color"
            placeholder="Color"
            name="color"
          />
          <button type='button' onClick={handleAddColor}>Add color</button>
          <div className="newColors">
            {color.map((color, index) => (
              <>
              <span
                key={index}
                style={{ backgroundColor: color, width: '50px', height: '20px', display: 'inline-block', border: '2px solid #000' }}
              ></span>
              <br/>
              </>
            ))}
          </div>
        </div>
        <div className={styles.sizeContainer}>
            <input className={styles.sizeIn} type="text" placeholder="Size" name="size" />
            <button type='button' onClick={handleAddSize}>Add color</button>
            <div className={styles.sizeContent}>
              {size.map((size, index) => (
                <p key={index} style={{padding: '5px'}}>{size}</p>
              ))}
            </div>
        </div>
        <textarea
          required
          name="desc"
          id="desc"
          rows="16"
          placeholder="Description"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
