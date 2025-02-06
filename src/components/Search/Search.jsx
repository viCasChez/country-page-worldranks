import React from 'react';
import useCountryStore from '../../store/store';

import cls from './Search.module.css';

export const Search = () => {
  const { numResults, filterByText } = useCountryStore();

  const txtFound = `Found ${numResults} ${numResults === 1 ? 'country' : 'countries'}`;

  return (
    <section className={cls.cpw_search}>
      <p>{txtFound}</p>
      <input onChange={(e) => filterByText(e.target.value)} type="" placeholder="Search by Name, Region, Subregion" />
    </section>
  )
}