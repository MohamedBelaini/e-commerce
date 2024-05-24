'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation'; 
import styles from "./loginForm.module.css";

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'admin') {
      router.push('/Dashboard');
    } else {
      alert('Username o password errati!');
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          type="submit"
          className={styles.Link}
        >
          Login
        </button>
      </form>
    </>
  );
}

export default LoginForm;
