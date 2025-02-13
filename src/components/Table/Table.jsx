import React from 'react';
import cls from './Table.module.css';
import { TableLoading } from './TableLoading';
import { TableHeader } from './TableHeader';
import { TableCountries } from './TableCountries';
import { TablePagination } from './TablePagination';

export const Table = ({
  data = [],
  isLoading,
  error,
  itemsPerPage,
  currentItemsPerPage,
  setCurrentItemsPerPage,
  currentPage,
  setCurrentPage,
  isMobile,
  handleCountryClick,
}) => {

  const indexOfLastItem = currentPage * currentItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - currentItemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  const itemsPage = data.length;
  const skeletonNumbers = currentItemsPerPage - itemsPage;

  return (
    <>
      <TableHeader isMobile={isMobile} />
      {error && <p className={`${cls.error}`}>Error: {error}</p> }
      {isLoading && <TableLoading skeletonNumbers={skeletonNumbers} isMobile={isMobile} />}

      {!isLoading && !error && (
        <>
          <TableCountries countries={currentData} isMobile={isMobile} handleCountryClick={handleCountryClick} />
          <TablePagination
            items={itemsPage}
            itemsPerPage={itemsPerPage}
            currentItemsPerPage={currentItemsPerPage}
            setCurrentItemsPerPage={setCurrentItemsPerPage}
            currentPage={currentPage}
            firstItem={ indexOfFirstItem + 1}
            lastItem={ indexOfLastItem }
            setCurrentPage={setCurrentPage}
          />
        </>
      )}

    </>
  );

}
