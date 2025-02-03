import React, { useState } from "react";
import useCountryStore from '../../store/store';

import cls from './Status.module.css'

export const Status = () => {
  const { filterByStatus } = useCountryStore();

  const [ status, setStatus ] = useState([]);

  const handleStatus = (event) => {
    const { name, checked } = event.target;
    
    const newStatus = checked
      ? addStatus(name)
      : removeStatus(name);
    
    setStatus(newStatus);
  }

  const addStatus = (name) => {
    const newStatus = [...status, name];
    filterByStatus(newStatus);
    return newStatus
  }

  const removeStatus = (name) => {
    const newStatus = status.filter(state => state !== name);
    filterByStatus(newStatus);
    return newStatus;
  }

  return (
    <section className={cls.cpw_status}>
      <p>Status</p>
      <div><input type="checkbox" name="unitedNation" onChange={handleStatus} /> Member of the United Nations</div>
      <div><input type="checkbox" name="independent" onChange={handleStatus} /> Independent</div>
    </section>
  )
}