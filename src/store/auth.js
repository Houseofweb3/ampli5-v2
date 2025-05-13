import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: {
        name: '',
        profile: '',
      },
      yepsScore: 0,
      token: null,

      login: ({ user, token }) => {
        set({ user, token });
      },

      logout: () => {
        set({
          user: { name: '', profile: '' },
          yepsScore: 0,
          token: null,
        });
      },

      profileUpdate: ({ name, profile }) => {
        const { token, yepsScore } = get();
        set({
          user: { name, profile },
          yepsScore,
          token,
        });
      },

      updateYepsScore: ({ yepsScore }) => {
        const { user, token } = get();
        set({
          user,
          token,
          yepsScore, // ✅ fixed casing from "YepsScore"
        });
      },
    }),
    {
      name: 'ampli5-user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
