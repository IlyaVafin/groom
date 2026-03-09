import { createContext } from "react";
import type { UserContextType } from "./userContextProvider";

export const UserContext = createContext<UserContextType | null>(null)