// actions.js
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const fetchProduct = async (productId) => {
  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product');
  }
};

export const updateProduct = async (productId, updatedProductData) => {
  try {
    const docRef = doc(db, 'products', productId);
    await updateDoc(docRef, updatedProductData);
    console.log('Product updated successfully!');
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
};



export const fetchUser = async (id) => {
  try {
    
    const userDoc = doc(db, 'users', id);
    const userSnapshot = await getDoc(userDoc);
    
    if (userSnapshot.exists()) {
     
      return { id: userSnapshot.id, ...userSnapshot.data() };
    } else {
      
      return null;
    }
  } catch (error) {
    
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
};


export const updateUser = async (id, userData) => {
  try {
  
    const userDoc = doc(db, 'users', id);
    await updateDoc(userDoc, userData);
   
    return true;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
};

