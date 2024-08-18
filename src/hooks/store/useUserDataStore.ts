import { create } from "zustand";

type userDataType = {
  id: number | string;
  email: string | null;
  fullname: string | null;
  avatar_url: string | null;
  username: string | null;
  avatar_name: string | null;
  created_at: string | null;
  password: string | null;
  phone_number: string | null;
  updated_at: string | null;
};

interface IUserDataProps {
  userData: userDataType;
  setUserData: (values: userDataType) => void;
}

export const useUserDataStore = create<IUserDataProps>((set) => ({
  userData: {
    id: "" || 0,
    email: "" || null,
    fullname: "" || null,
    avatar_url: "" || null,
    username: "" || null,
    avatar_name: "" || null,
    created_at: "" || null,
    updated_at: "" || null,
    password: "" || null,
    phone_number: "" || null,
  },
  setUserData: (userData) => set({ userData: userData }),
}));
