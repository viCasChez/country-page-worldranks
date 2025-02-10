import React, { useState } from 'react';
import cls from './Table.module.css';

export const TablePagination = ({ 
  items,
  itemsPerPage,
  currentItemsPerPage,
  setCurrentItemsPerPage,
  currentPage,
  firstItem,
  lastItem,
  setCurrentPage
}) => {

  const numberPages = Math.ceil(items / currentItemsPerPage);
  const showButtons = numberPages > 1;
  const calcLastItem = lastItem > items ? items : lastItem;

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = Number(event.target.value);
    setCurrentItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className={`${cls.table_pagination}`}>
      {
         showButtons && <div className={`${cls.table_buttons}`}>
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}>
              « <span> First</span>
            </button>
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}>
              ‹ <span> Back</span>
            </button>
          
          {[...Array(numberPages)].map((_, index) => (
            <button
              key={index}
              className={`${cls.btn_page} ${currentPage === index + 1 ? cls.active : ''}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button 
            disabled={calcLastItem === items}
            onClick={() => setCurrentPage(currentPage + 1)}>
              <span>Next </span> ›
            </button>
          <button 
            disabled={calcLastItem === items}
            onClick={() => setCurrentPage(numberPages)}>
              <span>Last </span> »
            </button>
        </div>
      }

      <div className={`${cls.items_per_page}`}>
        <span>Resultados por página</span>
        <select
          id="itemsPerPageSelect"
          value={currentItemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          {itemsPerPage.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className={`${cls.items_of_total}`}>
          {firstItem}-{calcLastItem} de {items}
        </span>
      </div>

    </div>
  );
}