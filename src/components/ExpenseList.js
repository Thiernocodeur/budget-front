import React from 'react';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  return (
    <div>
      <h2>Liste des Dépenses</h2>
      <ul>
        {expenses.map(exp => (
          <li key={exp.id}>
            {exp.title} - {exp.montant} - {exp.date}
            <button onClick={() => onDeleteExpense(exp.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
