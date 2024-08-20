import React, { useState, useEffect } from 'react';
import AddExpenseForm from './components/AddExpenseForm';
import AddIncomeForm from './components/AddIncomeForm';
import BudgetSummary from './components/BudgetSummary'; 
import axios from 'axios';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);
  const [showAddIncomeForm, setShowAddIncomeForm] = useState(false);

  useEffect(() => {
    fetchExpenses();
    fetchIncomes();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/expense');
      console.log('Dépenses:', response.data);  // Vérifiez les données ici
      setExpenses(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des dépenses:', error);
    }
  };

  const fetchIncomes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/income');
      console.log('Revenus:', response.data);  // Vérifiez les données ici
      setIncomes(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des revenus:', error);
    }
  };

  const handleAddExpense = async (expense) => {
    try {
      const response = await axios.post('http://localhost:3000/expense', expense);
      setExpenses([...expenses, response.data]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la dépense:', error);
    }
  };

  const handleAddIncome = async (income) => {
    try {
      const response = await axios.post('http://localhost:3000/income', income);
      setIncomes([...incomes, response.data]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du revenu:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/expense/${id}`);
      setExpenses(expenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la dépense:', error);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/income/${id}`);
      setIncomes(incomes.filter((income) => income.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du revenu:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Gestion du Budget</h1>

      <BudgetSummary />

      {/* Tableau des Dépenses */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-600">Liste des dépenses</h2>
        <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
          <thead className="bg-teal-700 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Titre</th>
              <th className="py-3 px-4 text-left">Montant (CFA)</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b">
                <td className="py-3 px-4">{expense.title}</td>
                <td className="py-3 px-4">{expense.amount} F CFA</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="py-3 px-4" colSpan="3">
                <button
                  onClick={() => setShowAddExpenseForm(true)}
                  className="text-yellow-600 hover:text-yellow-800"
                >
                  <i className="fas fa-plus-circle"></i> Ajouter Dépense
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Tableau des Revenus */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-yellow-600">Liste des revenus</h2>
        <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
          <thead className="bg-teal-700 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Titre</th> {/* Modifier 'Source' en 'Titre' */}
              <th className="py-3 px-4 text-left">Montant (CFA)</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income) => (
              <tr key={income.id} className="border-b">
                <td className="py-3 px-4">{income.titre}</td> {/* Afficher le 'titre' */}
                <td className="py-3 px-4">{income.amount} F CFA</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDeleteIncome(income.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="py-3 px-4" colSpan="3">
                <button
                  onClick={() => setShowAddIncomeForm(true)}
                  className="text-yellow-600 hover:text-yellow-800"
                >
                  <i className="fas fa-plus-circle"></i> Ajouter Revenu
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Formulaire d'ajout de dépense */}
      {showAddExpenseForm && (
        <AddExpenseForm
          onClose={() => setShowAddExpenseForm(false)}
          onAddExpense={handleAddExpense}
        />
      )}

      {/* Formulaire d'ajout de revenu */}
      {showAddIncomeForm && (
        <AddIncomeForm
          onClose={() => setShowAddIncomeForm(false)}
          onAddIncome={handleAddIncome}
        />
      )}
    </div>
  );
}

export default App;
