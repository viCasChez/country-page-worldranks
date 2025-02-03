import React, { useEffect } from 'react';
import useCountryStore from '../store/store';
import { Header, Search, SortBy, Region, Status, Table } from './';

export function CountryRanking() {
  const { setCountries, setError, isLoading, error, filteredCountries } = useCountryStore();

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
            <Table countries={filteredCountries} isLoading={isLoading} error={error} />
          </div>
        </div>
      </main>
    </>
  );
}

export default CountryRanking;
