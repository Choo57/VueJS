import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: ""
  }),

  actions: {
    async setThemeAction(payload) {
        this.theme = payload;
    }
  }
})