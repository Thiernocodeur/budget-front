import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BudgetSummary = () => {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, remainingBudget: 0 });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:3000/budget-summary');
        const data = response.data;

        // Validation des types
        const validatedData = {
          totalIncome: Number(data.totalIncome) || 0,
          totalExpense: Number(data.totalExpense) || 0,
          remainingBudget: Number(data.remainingBudget) || 0,
        };

        setSummary(validatedData);
      } catch (error) {
        console.error('Erreur lors de la récupération du résumé du budget', error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="p-4 flex justify-center gap-4">
      {/* Carte Revenu Total */}
      <div className="w-1/4 bg-white shadow-md rounded-md border border-gray-200">
        <div className="p-4 border-b border-gray-200 bg-green-700 text-white">
          <p className="text-lg font-semibold">Revenu Total</p>
        </div>
        <div className="p-4">
          <p className="text-2xl font-bold">{summary.totalIncome.toFixed(2)} CFA</p>
        </div>
      </div>
      
      {/* Carte Dépenses Totales */}
      <div className="w-1/4 bg-white shadow-md rounded-md border border-gray-200">
        <div className="p-4 border-b border-gray-200 bg-green-700 text-white">
          <p className="text-lg font-semibold">Dépenses Totales</p>
        </div>
        <div className="p-4">
          <p className="text-2xl font-bold">{summary.totalExpense.toFixed(2)} CFA</p>
        </div>
      </div>
      
      {/* Carte Budget Restant */}
      <div className="w-1/4 bg-white shadow-md rounded-md border border-gray-200">
        <div className="p-4 border-b border-gray-200 bg-green-700 text-white">
          <p className="text-lg font-semibold">Budget Restant</p>
        </div>
        <div className="p-4">
          <p className="text-2xl font-bold">{summary.remainingBudget.toFixed(2)} CFA</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;
