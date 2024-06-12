import { create } from "zustand";

interface IAuthStoreProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const useAuthStore = create<IAuthStoreProps>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) =>
    set({ isAuthenticated: isAuthenticated }),
}));
