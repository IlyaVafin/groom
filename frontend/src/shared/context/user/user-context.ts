import { createContext } from "react";
import type { UserContextType } from "./user-context-provider";

export const UserContext = createContext<UserContextType | null>(null)