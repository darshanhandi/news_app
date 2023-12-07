import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import styles from '../styles/styles.module.css';

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className={styles.auth_container}>
      <div className={styles.form_container}>
        <form>
          {showLogin ? <LoginForm /> : <RegisterForm />}
          
          <button className={styles.form_button} onClick={showLogin ? null : toggleForm}>
            {showLogin ? 'Login' : 'Register'}
          </button>
          
        </form>
        
        <font  className={styles.toggle_button} onClick={toggleForm}>
            {showLogin ?  'Switch to Register' : 'Switch to Login'}
          </font>
          
      </div>  
      
    </div>
  );
};

function App() {
  return (
    <div className={styles.App}>
      <AuthPage />
    </div>
  );
}

export default App;
