
"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./loginForm.module.css";

function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'mohamed' && password === 'mohamed') {
      router.push("/Dashboard");
    } 
  };

  return (
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
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
