import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setSaveEmail, mealsToken, cocktailsToken } from '../storage/setStorage';
import LogoLogin from '../images/Logo/LogoLogin.png';
import './CSS/Login.css';

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
    <div className="login-container">
      <div className="login-form">
        <img className="img-login" src={ LogoLogin } alt="Logo" />

        <h2 className="text-login">Login</h2>
        <form className="form-login">
          <div className="container-input-login">
            <input
              className="input-login"
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
              className="input-login"
              data-testid="password-input"
              type="password"
              placeholder="Senha"
              value={ password }
              onChange={ (e) => {
                setPassword(e.target.value);
                emailValidation();
              } }
            />
          </div>
          <button
            className="button-login"
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
      </div>
    </div>
  );
}

export default Login;
