import React, { useState, useEffect } from 'react';
import { isMobileDevice } from '../../utils/utils';

import './Table.css';

export const Table = () => {

  const countries = [{
    flag: '🇨🇳',
    name: 'China',
    population: 140211200,
    area: 9706961,
    region: 'Asia',
  }, {
    flag: '🇮🇳',
    name: 'India',
    population: 14393237776,
    area: 3287590,
    region: 'Asia',
  }, {
    flag: '🇺🇸',
    name: 'United State',
    population: 329484123,
    area: 9372619,
    region: 'Americas',
  }];

  const skeletonNumbers = 10 - countries.length;

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
      <section className="cpw-table header">
        <div>Flag</div>
        <div>Name</div>
        <div>Population</div>
        <div>Area (km2)</div>
        {!isMobile ? <div>Region</div> : ''}
      </section>
      {countries.map(({flag, name, population, area, region}, index) => (
        <section key={index} className="cpw-table body">
          <div className="cpw-table_flags">{flag}</div>
          <div className="cpw-table_name">{name}</div>
          <div className="cpw-table_population">{population}</div>
          <div className="cpw-table_area">{area}</div>
          {!isMobile ? <div className="cpw-table_region">{region}</div> : ''}
        </section>
      ))}
      {Array(skeletonNumbers).fill(null).map((_, index) => (
        <section key={index} className="cpw-table body skeleton">
          <div className="cpw-table_flags skeleton-box"></div>
          <div className="cpw-table_name skeleton-box"></div>
          <div className="cpw-table_population skeleton-box"></div>
          <div className="cpw-table_area skeleton-box"></div>
          {!isMobile && <div className="cpw-table_region skeleton-box"></div>}
        </section>
      ))}
    </>
);

}