import { useState } from 'react';
import styles from "../styles/styles.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here, e.g. send data to an API
    console.log('Logging in with:', email, password);
  };

  return (
    <div >
      <div>
        <h2>Login</h2>

        <input
          className={styles.form_input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={styles.form_input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
    </div>
  );
};

export default LoginForm;
