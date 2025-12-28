// AppProviders.tsx
import { ReactNode, useState } from "react";
import { NavContext, NavValue } from "./NavContext";

export function AppProviders({ children }: { children: ReactNode }) {
  const [nav, setNav] = useState<NavValue>(0);

  return (
    <NavContext.Provider value={{ nav, setNav }}>
        {children}
    </NavContext.Provider>
  );
}
