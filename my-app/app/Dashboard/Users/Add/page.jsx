'use client';
import styles from '../../../ui/Dashboard/users/addUsers/addUsers.module.css';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import React from 'react';

const handleSubmit = async (e) => {
  e.preventDefault();

  const username = e.target.username.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    await addDoc(collection(db, 'users'), {
      username,
      email,
      password,
    });

    e.target.reset();
    alert('Utente aggiunto con successo!');
  } catch (error) {
    console.error('Errore durante l\'aggiunta dell\'utente:', error);
    alert('Errore durante l\'aggiunta dell\'utente');
  }
};

export default function AddUser() {
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" name="username" required />
        <input type="email" placeholder="Email" name="email" required />
        <input type="password" placeholder="Password" name="password" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}