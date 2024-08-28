import React from 'react';

const IncomeList = ({ incomes, onDeleteIncome, onShowAddIncomeForm }) => {
  console.log('Revenus reçus:', incomes); // Vérifiez les données

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-4">Liste des Revenus</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-4 border-r">Titre</th>
            <th className="text-left py-2 px-4 border-r">Montant</th>
            <th className="text-left py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {incomes.length === 0 ? (
            <tr>
              <td colSpan="3" className="py-2 px-4 text-center">Aucun revenu disponible</td>
            </tr>
          ) : (
            incomes.map((income) => (
              <tr key={income.id} className="border-b">
                <td className="py-2 px-4 border-r">{income.titre}</td>
                <td className="py-2 px-4 border-r">{income.montant} FCFA</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => onDeleteIncome(income.id)}
                    className="text-white bg-red-500 hover:bg-red-700 p-1 rounded"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
          <tr>
            <td colSpan="3" className="py-2 px-4 text-center">
              <button
                onClick={onShowAddIncomeForm}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Ajouter Revenu
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IncomeList;
