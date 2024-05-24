'use client';

import React from 'react';
import styles from '../../../ui/Dashboard/users/addUsers/addUsers.module.css';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

const handleSubmit = async (e) => {
  e.preventDefault();

  const username = e.target.username.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const newUserRef = doc(collection(db, 'users'));
    const userId = newUserRef.id;

    await setDoc(newUserRef, {
      userId,
      username,
      email,
      password,
    });

    e.target.reset();
    alert('Add user success');
  } catch (error) {
    console.error('Errore durante l\'aggiunta dell\'utente:', error);
    alert('Errore durante l\'aggiunta dell\'utente');
  }
};

const AddUser = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" name="username" required />
        <input type="email" placeholder="Email" name="email" required />
        <input type="password" placeholder="Password" name="password" required />
        <button type="submit">Invia</button>
      </form>
    </div>
  );
};

export default AddUser;