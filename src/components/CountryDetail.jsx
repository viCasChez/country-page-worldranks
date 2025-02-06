import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCountryStore from '../store/store';
import { Header } from './';
import { Detail } from './CountryDetail/Detail';
import cls from './CountryDetail.module.css';

export const CountryDetail = () => {
  const { country, setCountry } = useCountryStore();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main>
        <article className={`${cls.country_detail}`}>
          <strong onClick={() => navigate('/')}>Volver</strong>
          {(!country || !country.name)
            ? <p>País no seleccionado.</p>
            : <Detail />
          }
        </article>
      </main>
    </>
  );
};
