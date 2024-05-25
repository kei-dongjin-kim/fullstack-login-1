import { create } from "zustand";
import axios from "axios";

interface User {
  email: string;
  nickname: string;
  token: string;
}

interface AuthState {
  user: User | null;
  init: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, nickname: string) => Promise<void>;
}

const useAuth = create<AuthState>((set) => ({
  user: null,
  init: () => {
    const user = localStorage.getItem("user");
    if (user) {
      set({ user: JSON.parse(user) });
    }
  },
  login: async (email, password) => {
    try {
      const res_token = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });
      const res_user = await axios.get("http://localhost:8080/api/user", {
        headers: {
          Authorization: `Bearer ${res_token.data.token}`,
        },
      });
      const user = {
        email: res_user.data.email,
        nickname: res_user.data.nickname,
        token: res_token.data.token,
      };
      set({ user });
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error(error);
    }
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem("user");
  },
  signup: async (email, password, nickname) => {
    try {
      await axios.post("http://localhost:8080/api/signup", {
        email,
        password,
        nickname,
      });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useAuth;
