import React from "react";
import useCountryStore from '../../store/store';
import cls from './Table.module.css';

export const TableHeader = ({ isMobile }) => {

  return (
    <section className={`${cls.cpw_table} ${cls.header}`}>
      <div>Flag</div>
      <div>Name</div>
      <div>Population</div>
      <div>Area (km2)</div>
      {!isMobile && <div>Region</div>}
    </section>
  );

}