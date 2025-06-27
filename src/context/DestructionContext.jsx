import { createContext, useState, useContext } from 'react';

const DestructionContext = createContext();

export const DestructionProvider = ({ children }) => {
  const [isDestroying, setIsDestroying] = useState(false);
  const [showBlackHole, setShowBlackHole] = useState(false);

  return (
    <DestructionContext.Provider
      value={{ isDestroying, setIsDestroying, showBlackHole, setShowBlackHole }}
    >
      {children}
    </DestructionContext.Provider>
  );
};



export const useDestruction = () => {
  const context = useContext(DestructionContext);
  if (!context) {
    throw new Error('useDestruction must be used within DestructionProvider');
  }
  return context;
};