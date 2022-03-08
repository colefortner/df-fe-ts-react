import { createContext } from "react";

interface IAuthContext {
  isLoggedIn: boolean;
  userId: string | null;
  avatar: string | null;
  username: string | null;
  token: string | null;
  login: (uid: string, token: string, avatar: string, username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  userId: null,
  avatar: null,
  username: null,
  token: null,
  login: () => {},
  logout: () => {},
});
