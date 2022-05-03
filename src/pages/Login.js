import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setSaveEmail, mealsToken, cocktailsToken } from '../storage/setStorage';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const emailValidation = () => {
    const MIN_LENGTH = 6;
    const emailCheck = /^.*@.*\.com$/.test(email);
    const passwordCheck = password.length >= MIN_LENGTH;
    if (emailCheck && passwordCheck) {
      setIsDisabled(false);
      return;
    }
    setIsDisabled(true);
  };

  return (
    <form>
      <h2>Login</h2>
      <input
        data-testid="email-input"
        type="email"
        placeholder="Email"
        value={ email }
        onChange={ (e) => {
          setEmail(e.target.value);
          emailValidation();
        } }
      />
      <input
        data-testid="password-input"
        type="password"
        placeholder="Senha"
        value={ password }
        onChange={ (e) => {
          setPassword(e.target.value);
          emailValidation();
        } }
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ isDisabled }
        onClick={ () => {
          history.push('/foods');
          setSaveEmail(email);
          mealsToken();
          cocktailsToken();
        } }
      >
        Entrar

      </button>
    </form>
  );
}

export default Login;
