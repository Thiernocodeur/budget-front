import axios from 'axios';

const API_URL = 'http://localhost:3000'; // URL de ton API

// Récupérer toutes les transactions
export const getTransactions = () => axios.get(`${API_URL}/transactions`);

// Ajouter une nouvelle transaction
export const addTransaction = (transaction) => axios.post(`${API_URL}/transactions`, transaction);

// Mettre à jour une transaction spécifique
export const updateTransaction = (id, transaction) => axios.put(`${API_URL}/transactions/${id}`, transaction);

// Supprimer une transaction spécifique
export const deleteTransaction = (id) => axios.delete(`${API_URL}/transactions/${id}`);

// Récupérer un résumé du budget
export const getBudgetSummary = () => axios.get(`${API_URL}/budget-summary`);
