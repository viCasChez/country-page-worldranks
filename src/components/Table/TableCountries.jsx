import React from "react";
import useCountryStore from '../../store/store';
import cls from './Table.module.css';

export const TableCountries = () => {
  const { filteredCountries } = useCountryStore();

  return (
    <>
      {!filteredCountries.length && <p className={`${cls.error}`}>Sin resultados...</p> }
      {filteredCountries.map(({flag, name, population, area, region}, index) => (
        <section key={index} className={`${cls.cpw_table} ${cls.body}`}>
          <div className={cls.cpw_table_flags}>
            <img src={flag} alt={name} />
          </div>
          <div>{name}</div>
          <div>{population}</div>
          <div>{area}</div>
          <div>{region}</div>
        </section>
      ))}
    </>
  );
};
