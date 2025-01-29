import React from 'react';

// CSS Modules
import cls from './Header.module.css';

export const Header = () => {

  return (
    <>
      <header className={cls.cpw_header}>
        <h1>World <span>Ranks</span></h1>
      </header>
    </>
  );

}