import { useContext } from "react";
import { adminContext } from "../context/adminContext"; // adjust path if needed

export const useAdminContext = () => {
  const context = useContext(adminContext);

  if (!context) {
    throw new Error("useAdminContext must be used inside a MentorContextProvider");
  }

  return context; 
};
