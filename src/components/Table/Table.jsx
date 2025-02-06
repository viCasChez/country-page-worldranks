import React, { useState, useEffect } from 'react';
import { isMobileDevice } from '../../utils/utils';

import cls from './Table.module.css';
import { TableLoading } from './TableLoading';
import { TableHeader } from './TableHeader';
import { TableCountries } from './TableCountries';
import { TablePagination } from './TablePagination';

export const Table = ({ countries = [], isLoading, error }) => {

  const skeletonNumbers = Math.max(10 - countries.length, 0);
  const itemsPage = countries.length;
  const itemsPerPage = 50;

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
      <TableHeader isMobile={isMobile} />
      {error && <p className={`${cls.error}`}>Error: {error}</p> }
      {isLoading && <TableLoading skeletonNumbers={skeletonNumbers} isMobile={isMobile} />}
      {!isLoading && !error && (
        <>
          <TablePagination items={itemsPage} itemsPerPage={itemsPerPage} />
          <TableCountries countries={countries} isMobile={isMobile} />
        </>
      )}
    </>
  );

}
