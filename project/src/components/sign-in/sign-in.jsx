import React, {useCallback, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {AppRoute} from '../../const.js';
import Logo from '../logo/logo.jsx';
import {login} from '../../store/user/api-actions';
import {getLoginError} from '../../store/user/selectors';

function SignIn({onSubmit, isError}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const errorStyle = useMemo(() => (isError ? {borderColor: 'red'} : {}), [isError]);

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();
    onSubmit({
      login: email,
      password,
    });
  }, [email, password, onSubmit]);

  const handlePasswordChange = useCallback((evt) => {
    const value = evt.target.value.trim();
    setPassword(value);
  }, []);

  const handleEmailChange = useCallback((evt) => {
    setEmail(evt.target.value);
  }, []);

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                {isError && <p>Please, enter a valid email!</p>}
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  style={errorStyle}
                  type="email"
                  name="email"
                  onChange={handleEmailChange}
                  placeholder="Email"
                  value={email}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  value={password}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.ROOT}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

SignIn.propTypes = {
  isError: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isError: getLoginError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (authData) => dispatch(login(authData)),
});

export {SignIn};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
