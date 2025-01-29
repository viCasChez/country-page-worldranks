import React, { useState } from "react";

import cls from './SortBy.module.css';

export const SortBy = () => {

  const sortDefault = 'population';

  const [ sortSelected, setSortSelected ] = useState(sortDefault);
  const options = ['name', 'population', 'area', 'region'];

  const onChangeSorting = (event) => {
    const { target } = event;
    setSortSelected(target.value);
  }

  return (
    <section className={cls.cpw_sort}>
      <p>Sort by</p>
      <select 
        value={sortSelected}
        onChange={onChangeSorting}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </section>
  );

}