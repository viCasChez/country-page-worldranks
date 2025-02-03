import React from 'react';
import useCountryStore from '../../store/store';
import cls from './SortBy.module.css';

export const SortBy = () => {
  const { sortBy, sortSelected } = useCountryStore();
  const options = ['name', 'population', 'area', 'region'];

  return (
    <section className={cls.cpw_sort}>
      <p>Sort by</p>
      <select value={sortSelected} onChange={(e) => sortBy(e.target.value)}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </section>
  );
};
