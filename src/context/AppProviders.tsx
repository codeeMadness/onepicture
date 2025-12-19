// AppProviders.tsx
import { ReactNode, useState } from "react";
import { NavContext, NavValue } from "./NavContext";
import { ThemeProvider } from "@mui/material/styles";

export function AppProviders({ children }: { children: ReactNode }) {
  const [nav, setNav] = useState<NavValue>("topics");

  return (
    <NavContext.Provider value={{ nav, setNav }}>
        {children}
    </NavContext.Provider>
  );
}
