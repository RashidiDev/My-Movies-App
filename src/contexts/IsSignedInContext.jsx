import { createContext, useState } from "react";

export const isSignedInContext = createContext();

export const IsSignedInContextProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <isSignedInContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </isSignedInContext.Provider>
  );
};
