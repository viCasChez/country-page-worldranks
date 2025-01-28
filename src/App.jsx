import React from 'react'
import { Header, Search, SortBy, Region, Status, Table } from './components' // Fichero de barril [/components/index.js]

import './App.css'

function App() {

  return (
    <>
      <Header />
      <main>
        <Search />
        <div className="filters-results">
          <div className="filter-options">
            <SortBy />
            <Region />
            <Status />
          </div>
          <div className="list-results">
            <Table />
          </div>
        </div>
      </main>
    </>
  )
}

export default App
