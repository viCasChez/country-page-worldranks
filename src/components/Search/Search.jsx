import React from 'react';

import './Search.css';

export const Search = ({founds = 234}) => {

  const txtFound = `${founds} ${founds === 0 || founds > 1 ? 'countries' : 'country'}`

  return (
    <search className='cpw-search'>
      <p>Found {txtFound}</p>
      <input type="" placeholder="Search by Name, Region, Subregion" />
    </search>
  )
}