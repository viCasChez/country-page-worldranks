import React from "react";
import cls from './Table.module.css';

export const TableCountries = ({ countries, isMobile }) => {

  return (
    <>
      {countries.map((country, index) => (
      <section key={index} className={`${cls.cpw_table} ${cls.body}`}>
        <div className={cls.cpw_table_flags}>
          <img src={country.flags.png} />
        </div>
        <div>{country.translations.spa.official || country.name.common}</div>
        <div>{country.population}</div>
        <div>{country.area}</div>
        {!isMobile ? <div>{country.region}</div> : ''}
      </section>
      ))}
    </>
  );

}