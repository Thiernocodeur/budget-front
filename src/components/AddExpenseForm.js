import React, { useState } from 'react';
import axios from 'axios';

const AddExpenseForm = ({ onClose, onAddExpense }) => {
  const [titre, setTitre] = useState('');
  const [montant, setMontant] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Vérification que le montant est supérieur à zéro
    if (parseFloat(montant) <= 0) {
      setError('Le montant doit être supérieur à zéro.');
      return;
    }

    try {
      // Envoyer les données du formulaire à l'API
      const response = await axios.post('http://localhost:3000/expense', {
        titre,         // Remplacer title par titre
        montant: parseFloat(montant),
        date,
      });

      // Appeler onAddExpense pour mettre à jour la liste des dépenses
      if (onAddExpense) {
        onAddExpense(response.data);
      }

      // Réinitialiser les champs du formulaire après l'ajout
      setTitre('');
      setMontant('');
      setDate('');
      setError('');

      // Fermer le formulaire après l'ajout
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la dépense:', error);
      setError('Une erreur s\'est produite lors de l\'ajout de la dépense.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Ajouter Dépense</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Titre</label>
            <input
              type="text"
              value={titre}    // Remplacer title par titre
              onChange={(e) => setTitre(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Montant</label>
            <input
              type="number"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Ajouter
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseForm;
