import React from 'react';

import cls from './Search.module.css';

export const Search = ({founds = 234}) => {

  const txtFound = `${founds} ${founds === 0 || founds > 1 ? 'countries' : 'country'}`

  return (
    <search className={cls.cpw_search}>
      <p>Found {txtFound}</p>
      <input type="" placeholder="Search by Name, Region, Subregion" />
    </search>
  )
}