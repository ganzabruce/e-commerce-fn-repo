import { useContext } from "react";
import { userContext } from "../context/userContext";// adjust path if needed

export const useUserContext = () => {
  const context = useContext(userContext);

  if (!context) {
    throw new Error("useUserContext must be used inside a UserContextProvider");
  }

  return context; 
};
