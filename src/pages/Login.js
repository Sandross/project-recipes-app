import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from '../context/Context';
import { setSaveEmail, mealsToken, cocktailsToken } from '../storage/setStorage';

function Login() {
  const { email, setEmail } = useContext(MyContext);
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
    <div>
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
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
