import React from 'react';

import cls from './Search.module.css';

export const Search = ({ numResults = 0 }) => {
  const txtFound = `Found ${numResults} ${numResults === 1 ? 'country' : 'countries'}`;

  return (
    <section className={cls.cpw_search}>
      <p>{txtFound}</p>
      <input type="" placeholder="Search by Name, Region, Subregion" />
    </section>
  )
}