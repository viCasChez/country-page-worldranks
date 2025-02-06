import React, { useState } from 'react';
import cls from './Table.module.css';

export const TablePagination = ({ items, itemsPerPage }) => {

  const [pageSelected, setPageSelected] = useState(1);

  const firstNumber = pageSelected * itemsPerPage - itemsPerPage + 1;
  const lastNumber = items < 50 ? items : pageSelected * itemsPerPage;
  const numberPages = Math.ceil(items / itemsPerPage);

  const sumPageSelected = (numPage) => {
    setPageSelected(numPage + 1)
  }

  const subPageSelected = (numPage) => {
    setPageSelected(--numPage)
  }


  return (
    <div className={`${cls.table_pagination}`}>
      <div className={`${cls.table_buttons}`}>
        <button 
          disabled={pageSelected === 1}
          onClick={() => subPageSelected(2)}>
            « <span> First</span>
          </button>
        <button 
          disabled={pageSelected === 1}
          onClick={() => subPageSelected(pageSelected)}>
            ‹ <span> Back</span>
          </button>
        
        {[...Array(numberPages)].map((_, index) => (
          <button
            key={index}
            className={`${cls.btn_page} ${pageSelected === index + 1 ? cls.active : ''}`}
            onClick={() => sumPageSelected(index)}
          >
            {index + 1}
          </button>
        ))}

        <button 
          disabled={lastNumber === items}
          onClick={() => sumPageSelected(pageSelected)}>
            <span>Next </span> ›
          </button>
        <button 
          disabled={lastNumber === items}
          onClick={() => sumPageSelected(numberPages -1)}>
            <span>Last </span> »
          </button>
      </div>

      <div className={`${cls.items_per_page}`}>
        <span>Resultados por página</span> {itemsPerPage}
        <span className={`${cls.items_of_total}`}>
          {firstNumber}-{lastNumber} de {items}
        </span>
      </div>

    </div>
  );
}