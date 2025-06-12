import { createContext, useState } from 'react';
import { useTheme } from '@/devKit/useTheme';
// Create a context
export const GlobalContext = createContext();


// Create a provider component
const GlobalState = ({ children }) => {
  // Create a state variable
  const [state, setState] = useState({

  });

  const { 
    theme,
    setTheme,
    toggleTheme } = useTheme()

  // Create a function to update the state
  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  return (
    <GlobalContext.Provider value={{ 
      state, updateState, 
      theme, toggleTheme 
      }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;