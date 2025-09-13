import  { createContext, useEffect, useReducer } from "react";
import type{ Dispatch, ReactNode } from "react";
export type Admin = {
  id: string;
  name: string;
  email: string;
};

type AdminState = {
  admin: Admin | null;
};

type AdminAction =
  | { type: "login"; payload: Admin }
  | { type: "signup"; payload: Admin }
  | { type: "logout" };

const initialState: AdminState = {
  admin: null,
};

export const adminContext = createContext<
  AdminState & { dispatch: Dispatch<AdminAction> }
>({
  ...initialState,
  dispatch: () => undefined,
});

const adminReducer = (state:AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case "login":
    case "signup":
      return { admin: action.payload };
    case "logout":
      return { admin: null };
    default:
      return state;
  }
};

export const AdminContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  useEffect(() => {
    const storedMentor = localStorage.getItem("admin");
    if (storedMentor) {
      const context: Admin = JSON.parse(storedMentor);
      dispatch({ type: "login", payload: context });
    }
  }, []);

  return (
    <adminContext.Provider value={{ ...state, dispatch }}>
      {children}
    </adminContext.Provider>
  );
};
