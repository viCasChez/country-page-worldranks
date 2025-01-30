import React from "react";
import cls from './Table.module.css';

export const TableLoading = ({ skeletonNumbers, isMobile }) => {

  return (
    <>
      {Array.from({ length: skeletonNumbers }, (_, index) => (
        <section key={index} className={`${cls.cpw_table} ${cls.body}`}>
          <div className={`${cls.cpw_table_flags} ${cls.skeleton_box}`}></div>
          <div className={`${cls.skeleton_box}`}></div>
          <div className={`${cls.skeleton_box}`}></div>
          <div className={`${cls.skeleton_box}`}></div>
          {!isMobile && <div className={`${cls.skeleton_box}`}></div>}
        </section>
      ))}
    </>
  );

}