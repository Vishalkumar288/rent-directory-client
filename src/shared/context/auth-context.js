import { createContext } from "react";

export const AppContext = createContext({
    userData: null,
    updateUserData: () => {}
});
