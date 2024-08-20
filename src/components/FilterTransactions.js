import React, { useState } from 'react';

const FilterTransactions = ({ onFilter }) => {
  const [filterValue, setFilterValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setFilterValue(value);
    onFilter(value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="filter" className="block text-gray-700">Filtrer les transactions</label>
      <input
        id="filter"
        type="text"
        value={filterValue}
        onChange={handleChange}
        placeholder="Entrez le terme de recherche"
        className="mt-2 p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default FilterTransactions;
