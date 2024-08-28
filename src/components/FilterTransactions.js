import React, { useState } from 'react';

const FilterTransactions = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    titre: '',
    montantMin: '',
    montantMax: '',
    date: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [name]: value };
      onFilter(updatedFilters); // Appel de la fonction de filtre avec les filtres mis à jour
      return updatedFilters;
    });
  };

  const handleReset = () => {
    const resetFilters = { titre: '', montantMin: '', montantMax: '', date: '' };
    setFilters(resetFilters);
    onFilter(resetFilters); // Réinitialisation des filtres
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-gray-700">Filtrer les transactions</h2>
      
      <div className="space-y-4 mt-4">
        <div>
          <label htmlFor="titre" className="block text-gray-600">Titre</label>
          <input
            id="titre"
            name="titre"
            type="text"
            value={filters.titre}
            onChange={handleChange}
            placeholder="Entrez le titre"
            className="mt-1 p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="montantMin" className="block text-gray-600">Montant Minimum</label>
          <input
            id="montantMin"
            name="montantMin"
            type="number"
            value={filters.montantMin}
            onChange={handleChange}
            placeholder="Entrez le montant minimum"
            className="mt-1 p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="montantMax" className="block text-gray-600">Montant Maximum</label>
          <input
            id="montantMax"
            name="montantMax"
            type="number"
            value={filters.montantMax}
            onChange={handleChange}
            placeholder="Entrez le montant maximum"
            className="mt-1 p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-gray-600">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={filters.date}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleReset}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterTransactions;
