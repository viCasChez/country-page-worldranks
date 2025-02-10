import React, { useState, useEffect } from 'react';
import { isMobileDevice } from '../../utils/utils';

import cls from './Table.module.css';
import useCountryStore from '../../store/store';
import { TableLoading } from './TableLoading';
import { TableHeader } from './TableHeader';
import { TableCountries } from './TableCountries';
import { TablePagination } from './TablePagination';

export const Table = ({ countries = [], isLoading, error }) => {

  const itemsPage = countries.length;
  const skeletonNumbers = Math.max(10 - itemsPage, 0);
  const itemsPerPage = [10, 20, 50, 100];

  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(50);
  const { filteredCountries, currentPage, setCurrentPage } = useCountryStore();
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

  const indexOfLastCountry = currentPage * currentItemsPerPage;
  const indexOfFirstCountry = indexOfLastCountry - currentItemsPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  return (
    <>
      <TableHeader isMobile={isMobile} />
      {error && <p className={`${cls.error}`}>Error: {error}</p> }
      {isLoading && <TableLoading skeletonNumbers={skeletonNumbers} isMobile={isMobile} />}
      {!isLoading && !error && (
        <>
          <TableCountries countries={currentCountries} isMobile={isMobile} />
          <TablePagination
            items={itemsPage}
            itemsPerPage={itemsPerPage}
            currentItemsPerPage={currentItemsPerPage}
            setCurrentItemsPerPage={setCurrentItemsPerPage}
            currentPage={currentPage}
            firstItem={ indexOfFirstCountry + 1}
            lastItem={ indexOfLastCountry }
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );

}
