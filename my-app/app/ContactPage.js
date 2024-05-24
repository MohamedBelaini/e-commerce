'use client'
import {db} from './firebaseConfig'
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'DataBase'), {
                name,
                email,
                message,
                timestamp: new Date(),
            });
            setName('');
            setEmail('');
            setMessage('');
            alert('Your Collection is successe!')
        } catch (error) {
            alert('Your Collection is error.')
        }
    }
  
    return (
      <div>
        <h1>Contattaci</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Nome:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Messaggio:
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Invia</button>
        </form>
      </div>
    );
  };
  
  export default ContactPage;