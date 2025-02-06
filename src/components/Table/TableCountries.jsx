import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCountryStore from '../../store/store';
import cls from './Table.module.css';

export const TableCountries = ({ isMobile }) => {
  const { filteredCountries, setCountry } = useCountryStore();
  const navigate = useNavigate();

  const handleCountryClick = (name) => {
    setCountry(name);
    navigate(`/country/${name}`);
  }

  return (
    <>
      {!filteredCountries.length && <p className={`${cls.error}`}>Sin resultados...</p> }
      {filteredCountries.map(({flag, name, population, area, region}, index) => (
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
