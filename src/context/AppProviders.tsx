// AppProviders.tsx
import { ReactNode, useState } from "react";
import { NavContext, NavValue } from "./NavContext";
import { User } from "firebase/auth";
import { AuthContext } from "./AuthContext";

export function AppProviders({ children }: { children: ReactNode }) {
  const [nav, setNav] = useState<NavValue>(0);
  const [userDetail, setUserDetail] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ userDetail, setUserDetail }}>
      <NavContext.Provider value={{ nav, setNav }}>
        {children}
      </NavContext.Provider>
    </AuthContext.Provider>
  );
}
