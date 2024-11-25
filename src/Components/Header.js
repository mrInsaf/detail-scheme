import React from 'react';
import './Header.css';

const Header = ({ isLoggedIn, onLogin, onRegister, onLogout }) => {
  return (
    <header className="header">
      <div className="logo">
        <span>Ильяс гибка</span>
      </div>
      <nav className="menu">
        {isLoggedIn ? (
          <>
            <button className="menu-button">Меню</button>
            <button className="logout-button" onClick={onLogout}>
              Выйти
            </button>
          </>
        ) : (
          <>
            <button className="login-button" onClick={onLogin}>
              Вход
            </button>
            <button className="register-button" onClick={onRegister}>
              Регистрация
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
