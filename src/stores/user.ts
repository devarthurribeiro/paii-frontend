import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useLocalStorage } from '@vueuse/core';

function decodeJwt(token: string) {
  try {
    const [header, payload, signature] = token.split('.');

    const decodedHeader = JSON.parse(atob(header));
    const decodedPayload = JSON.parse(atob(payload));

    return decodedPayload;
  } catch (e) {
    return null;
  }
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: useLocalStorage('@auth/token', ''),
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    userMeta: (state) => decodeJwt(state.token),
  },
  actions: {
    login(data: { token: string }) {
      this.token = data.token;
      this.updateAxiosToken();
    },
    logout() {
      this.token = '';
      delete api.defaults.headers.common.Authorization;
    },
    updateAxiosToken() {
      api.defaults.headers.common.Authorization = `Bearer ${this.token}`;
    },
  },
});
