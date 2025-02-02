import React, { useState } from 'react';

import cls from './Region.module.css';

export const Region = () => {

  const allRegions = ['Americas', 'Antartic', 'Africa', 'Asia', 'Europe', 'Oceania'];

  const [ regions, setRegions ] = useState([]);

  const handleRegions = (event) => {
    const selectedRegion = event.target.textContent;
    const hasRegion = regions.includes(selectedRegion);
    
    const newRegions = hasRegion
      ? removeRegion(selectedRegion)
      : addRegion(selectedRegion);
    
      setRegions(newRegions);
  };

  const addRegion = (selectedRegion) => {
    return [...regions, selectedRegion];
  }

  const removeRegion = (selectedRegion) => {
    return regions.filter(region => region !== selectedRegion);
  }

  return(
    <section className={cls.cpw_region}>
      <p>Region</p>
      <div className={cls.region_filters}>
        {allRegions.map((region, index) => (
            <span 
              key={index}
              className={regions.includes(region) ? cls.selected : null}
              onClick={handleRegions}
            >
              {region}
            </span>
        ))}
      </div>
    </section>
  );

}