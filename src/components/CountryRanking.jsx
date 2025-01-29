import React, { useEffect, useState } from 'react';
import { Header, Search, SortBy, Region, Status, Table } from './'; // Importación desde el barril

export function CountryRanking() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para carga
  const [error, setError] = useState(null); // Estado para errores

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true); // Indicar que la carga ha comenzado
      setError(null); // Reiniciar error

      try {
        const response = await fetch('https://restcountries.com/v3.1/all');

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError(error.message); // Guardar el mensaje de error
      } finally {
        setIsLoading(false); // Indicar que la carga ha finalizado
      }
    };

    fetchCountries();
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  return (
    <>
      <Header />
      <main>
        <Search numResults={countries.length} />
        <div className="filters_results">
          <div>
            <SortBy />
            <Region />
            <Status />
          </div>
          <div>
            <Table countries={countries} isLoading={isLoading} error={error} />
          </div>
        </div>
      </main>
    </>
  );
}

export default CountryRanking;
