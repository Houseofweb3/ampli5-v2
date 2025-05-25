import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const initialUser = {
  id: null,
  profile_picture: '',
  username: '',
  name: '',
  yeps_score: 0,
};

export const useAuthStore = create(
  persist(
    (set) => ({
      user: initialUser,
      token: null,
      isLogin: false,

      login: ({ user, token }) => {
        set({
          user,
          token,
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
