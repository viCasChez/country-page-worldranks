import React, { useState } from "react";

import './Status.css'

export const Status = () => {

  const [ status, setStatus ] = useState([]);

  const handleStatus = (event) => {
    const { name, checked } = event.target;
    
    const newStatus = checked
      ? addStatus(name)
      : removeStatus(name);
    
    setStatus(newStatus);
  }

  const addStatus = (name) => {
    return [...status, name];
  }

  const removeStatus = (name) => {
    return status.filter(state => state !== name);
  }

  return (
    <section className="cpw-status">
      <p>Status</p>
      <div><input type="checkbox" name="unitedNation" onChange={handleStatus} /> Member of the United Nations</div>
      <div><input type="checkbox" name="independent" onChange={handleStatus} /> Independent</div>
    </section>
  )
}