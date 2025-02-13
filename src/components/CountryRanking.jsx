import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCountryStore from '../store/store';
import { Header, Search, SortBy, Region, Status, Table } from './';
import { isMobileDevice } from '../utils/utils';

export const CountryRanking = () => {
  const { setCountries, setError, isLoading, error, filteredCountries, currentPage, setCurrentPage, setCountry } = useCountryStore();

  const itemsPerPage = [10, 20, 50, 100];
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(50);
  // Estado para detectar si es un dispositivo móvil
  const [isMobile, setIsMobile] = useState(isMobileDevice());  

  const navigate = useNavigate();

  const handleCountryClick = (name) => {
    setCountry(name);
    navigate(`/country/${name}`);
  }

  // useEffect para agregar y limpiar el evento de redimensionamiento
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCountries();
  }, [setCountries, setError]);

  return (
    <>
      <Header />
      <main>
        <Search />
        <div className="filters_results">
          <div>
            <SortBy />
            <Region />
            <Status />
          </div>
          <div>
            <Table
              data={filteredCountries}
              isLoading={isLoading}
              error={error}
              itemsPerPage={itemsPerPage}
              currentItemsPerPage={currentItemsPerPage}
              setCurrentItemsPerPage={setCurrentItemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              isMobile={isMobile}
              handleCountryClick={handleCountryClick}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default CountryRanking;
