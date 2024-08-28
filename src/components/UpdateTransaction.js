// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UpdateTransaction = ({ transaction, onClose, type }) => {
//   const [source, setSource] = useState('');
//   const [category, setCategory] = useState('');
//   const [amount, setAmount] = useState('');
//   const [date, setDate] = useState('');
//   const isNew = !transaction;

//   useEffect(() => {
//     if (transaction) {
//       setSource(transaction.titre || '');
      
//       setAmount(transaction.montant || '');
//       setDate(transaction.date || '');
//     }
//   }, [transaction]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const updatedTransaction = { source, category, amount: parseFloat(amount), date, type };
//     try {
//       if (isNew) {
//          await axios.post('http://localhost:3000/transactions', updatedTransaction);
//       } else {
//         await axios.put(`http://localhost:3000/transactions/${transaction.id}`, updatedTransaction);
//       }
//       onClose(); // Close the update form
//     } catch (error) {
//       console.error('Error updating transaction', error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">{isNew ? `Ajouter ${type === 'income' ? 'Revenu' : 'Dépense'}` : `Modifier ${type === 'income' ? 'Revenu' : 'Dépense'}`}</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {type === 'income' ? (
//             <div>
//               <label className="block">titre</label>
//               <input
//                 type="text"
//                 value={source}
//                 onChange={(e) => setSource(e.target.value)}
//                 className="border p-2 w-full"
//                 required
//               />
//             </div>
//           ) : (
//             <div>
//               <label className="block">montant</label>
//               <input
//                 type="text"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="border p-2 w-full"
//                 required
//               />
//             </div>
//           )}
//           <div>
//             <label className="block">Montant</label>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="border p-2 w-full"
//               required
//             />
//           </div>
//           <div>
//             <label className="block">Date</label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="border p-2 w-full"
//               required
//             />
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//               {isNew ? 'Ajouter' : 'Modifier'}
//             </button>
//             <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
//               Annuler
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateTransaction;
