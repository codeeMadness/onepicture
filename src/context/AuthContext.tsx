import { User } from "firebase/auth";
import { createContext, useContext } from "react";

interface AuthContextType {
  userDetail: User|null;
  setUserDetail: (user: User|null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AppProvider");
  }
  return ctx;
}