import React, { useState, useEffect } from 'react';
import { isMobileDevice } from '../../utils/utils';

import cls from './Table.module.css';

export const Table = ({ countries = [] }) => {

  const skeletonNumbers = Math.max(10 - countries.length, 0);

  // Estado para detectar si es un dispositivo móvil
  const [isMobile, setIsMobile] = useState(isMobileDevice());

  // Evento para manejar el redimensionamiento
  const handleResize = () => {
    setIsMobile(isMobileDevice());
  };

  // useEffect para agregar y limpiar el evento de redimensionamiento
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <section className={`${cls.cpw_table} ${cls.header}`}>
        <div>Flag</div>
        <div>Name</div>
        <div>Population</div>
        <div>Area (km2)</div>
        {!isMobile ? <div>Region</div> : ''}
      </section>
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
      {Array.from({ length: skeletonNumbers }, (_, index) => (
        <section key={index} className={`${cls.cpw_table} ${cls.body}`}>
          <div className={`${cls.cpw_table_flags} ${cls.skeleton_box}`}></div>
          <div className={`${cls.skeleton_box}`}></div>
          <div className={`${cls.skeleton_box}`}></div>
          <div className={`${cls.skeleton_box}`}></div>
          {!isMobile && <div className={`${cls.skeleton_box}`}></div>}
        </section>
      ))}
    </>
);

}