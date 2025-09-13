import  { createContext, useEffect, useReducer } from "react";
import type{ReactNode, Dispatch} from "react";

export type User = {
  id: string;
  username: string;
  email: string;
  token: string;
};

type UserState = {
  user: User | null;
};

type UserAction =
  | { type: "signup"; payload: User }
  | { type: "login"; payload: User }
  | { type: "logout" };

const initialState: UserState = {
  user: null,
};

export const userContext = createContext<
  UserState & { dispatch: Dispatch<UserAction> }
>({
  ...initialState,
  dispatch: () => undefined,
});

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "signup":
    case "login":
      return { user: action.payload };
    case "logout":
      return { user: null };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      dispatch({ type: "login", payload: user });
    }
  }, []);
  console.log(state)
  return (
    <userContext.Provider value={{ ...state, dispatch }}>
      {children}
    </userContext.Provider>
  );
};
