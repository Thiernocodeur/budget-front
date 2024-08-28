import React, { useState, useEffect } from 'react';
import AddExpenseForm from './components/AddExpenseForm';
import AddIncomeForm from './components/AddIncomeForm';
import BudgetSummary from './components/BudgetSummary'; 
import UpdateTransaction from './components/UpdateTransaction';
import FilterTransactions from './components/FilterTransactions';
import axios from 'axios';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filteredIncomes, setFilteredIncomes] = useState([]);
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);
  const [showAddIncomeForm, setShowAddIncomeForm] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    fetchExpenses();
    fetchIncomes();
  }, []);

  useEffect(() => {
    setFilteredExpenses(expenses);
    setFilteredIncomes(incomes);
  }, [expenses, incomes]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/expense');
      setExpenses(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des dépenses:', error);
    }
  };

  const fetchIncomes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/income');
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

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowUpdateForm(true);
  };

  const handleUpdateTransaction = (updatedTransaction) => {
    if (updatedTransaction.type === 'expense') {
      setExpenses(expenses.map(expense =>
        expense.id === updatedTransaction.id ? updatedTransaction : expense
      ));
    } else {
      setIncomes(incomes.map(income =>
        income.id === updatedTransaction.id ? updatedTransaction : income
      ));
    }
    setShowUpdateForm(false);
  };

  const handleFilter = (filters) => {
    const { titre, montantMin, montantMax, date } = filters;

    const filteredExps = expenses.filter((expense) => {
      return (
        (titre ? expense.titre.includes(titre) : true) &&
        (montantMin ? expense.montant >= montantMin : true) &&
        (montantMax ? expense.montant <= montantMax : true) &&
        (date ? expense.date === date : true)
      );
    });

    const filteredIncs = incomes.filter((income) => {
      return (
        (titre ? income.titre.includes(titre) : true) &&
        (montantMin ? income.montant >= montantMin : true) &&
        (montantMax ? income.montant <= montantMax : true) &&
        (date ? income.date === date : true)
      );
    });

    setFilteredExpenses(filteredExps);
    setFilteredIncomes(filteredIncs);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Gestion du Budget</h1>

      <BudgetSummary />

      <div className="flex justify-center mb-6">
        <div className="w-full max-w-sm">
          <FilterTransactions onFilter={handleFilter} />
        </div>
      </div>

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
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className="border-b">
                <td className="py-3 px-4">{expense.titre}</td>
                <td className="py-3 px-4">{expense.montant} F CFA</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleEditTransaction({ ...expense, type: 'expense' })}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Supprimer
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
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
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
              <th className="py-3 px-4 text-left">Titre</th>
              <th className="py-3 px-4 text-left">Montant (CFA)</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIncomes.map((income) => (
              <tr key={income.id} className="border-b">
                <td className="py-3 px-4">{income.titre}</td>
                <td className="py-3 px-4">{income.montant} F CFA</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleEditTransaction({ ...income, type: 'income' })}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteIncome(income.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Supprimer
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
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  <i className="fas fa-plus-circle"></i> Ajouter Revenu
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Formulaires d'ajout */}
      {showAddExpenseForm && (
        <AddExpenseForm onSave={handleAddExpense} onClose={() => setShowAddExpenseForm(false)} />
      )}
      {showAddIncomeForm && (
        <AddIncomeForm onSave={handleAddIncome} onClose={() => setShowAddIncomeForm(false)} />
      )}

      {/* Formulaire de mise à jour */}
      {showUpdateForm && (
        <UpdateTransaction
          transaction={selectedTransaction}
          onUpdate={handleUpdateTransaction}
          onClose={() => setShowUpdateForm(false)}
        />
      )}
    </div>
  );
}

export default App;
