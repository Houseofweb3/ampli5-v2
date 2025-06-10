import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string | null;
  profile_picture: string;
  username: string;
  name: string;
  yaps_score: number;
}

interface AuthState {
  user: User;
  token: string | null;
  isLogin: boolean;
  // eslint-disable-next-line no-unused-vars
  login: (value: { user: User; token: string }) => void;
  logout: () => void;
}

const initialUser: User = {
  id: null,
  profile_picture: '',
  username: '',
  name: '',
  yaps_score: 0,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: initialUser,
      token: null,
      isLogin: false,

      login: (data) => {
        set({
          user: data.user,
          token: data.token,
          isLogin: true,
        });
      },

      logout: () => {
        set({
          user: initialUser,
          token: null,
          isLogin: false,
        });
      },
    }),
    {
      name: 'ampli5-user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
