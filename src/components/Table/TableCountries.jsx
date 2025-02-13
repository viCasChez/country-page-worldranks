import React from 'react';
import cls from './Table.module.css';

export const TableCountries = ({ countries, handleCountryClick, isMobile }) => {

  return (
    <>
      {!countries.length && <p className={`${cls.error}`}>Sin resultados...</p> }
      {countries.map(({flag, name, population, area, region}, index) => (
        <section
          key={index}
          onClick={() => handleCountryClick(name)}
          className={`${cls.cpw_table} ${cls.body}`}
        >
          <div className={cls.cpw_table_flags}>
            <img src={flag} alt={name} />
          </div>
          <div>{name}</div>
          <div>{population.toLocaleString("es-ES")}</div>
          <div>{area.toLocaleString("es-ES")}</div>
          {!isMobile && <div>{region}</div>}
        </section>
      ))}
    </>
  );
};
