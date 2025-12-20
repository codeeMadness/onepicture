// NavContext.tsx
import { createContext, useContext } from "react";

export type NavValue = 0|1|2;

interface NavContextType {
  nav: NavValue;
  setNav: (nav: NavValue) => void;
}

export const NavContext = createContext<NavContextType | null>(null);

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) {
    throw new Error("useNav must be used inside NavProvider");
  }
  return ctx;
}
