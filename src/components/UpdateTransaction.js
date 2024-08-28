import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateTransaction = ({ transactionId, type, onClose, onUpdateTransaction }) => {
  const [titre, setTitre] = useState('');
  const [montant, setMontant] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/${type}/${transactionId}`);
        const { titre, montant, date } = response.data;
        setTitre(titre);
        setMontant(montant);
        setDate(date);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la transaction:', error);
      }
    };

    fetchTransaction();
  }, [transactionId, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3000/${type}/${transactionId}`, {
        titre,
        montant: parseFloat(montant),
        date
      });

      if (onUpdateTransaction) {
        onUpdateTransaction(response.data);
      }

      onClose();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la transaction:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Modifier la Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Titre</label>
            <input
              type="text"
              value={titre}
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
              Mettre à jour
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

export default UpdateTransaction;
