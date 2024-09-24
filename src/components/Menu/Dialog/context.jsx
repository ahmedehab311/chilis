// import  { createContext, useState, useContext } from 'react';

// // إنشاء CartContext
// const CartContext = createContext();

// // إنشاء CartProvider لتوفير السياق
// export const CartProvider = ({ children }) => {
//   const [totalPrices, setTotalPrices] = useState({});

//   const updateTotalPrices = (itemId, newTotalPrice) => {
//     setTotalPrices(prevPrices => ({
//       ...prevPrices,
//       [itemId]: newTotalPrice
//     }));
//   };

//   return (
//     <CartContext.Provider value={{ totalPrices, updateTotalPrices }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // إنشاء Hook للوصول إلى CartContext بسهولة
// export const useCart = () => useContext(CartContext);
