import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    loading: false,
    signInResponse: {success:false, text:''},
    forgotPasswordResponse: {success:false, text:''},
    creaetAccountResponse: {success:false, text:''}
  }),

  actions: {
    async signInAction(payload) {
      this.loading = true;

      setTimeout(() => { // simulate sign in, replace with your api call
        if(payload.email == 'admin@mycompany.com' && payload.password == 'password123') {
          this.signInResponse['success'] = true;
          this.signInResponse['text'] = '';
          this.loading = false;
          this.isLoggedIn = true;
          this.$router.push('/dashboard/');
        } else {
          this.loading = false;
          this.isLoggedIn = false;
          this.signInResponse['success'] = false;
          this.signInResponse['text'] = 'Incorrect username or password';
        }
      }, 1500);
    },

    async forgotPasswordAction(payload) {
      this.loading = true;
      this.forgotPasswordResponse['text'] = '';

      setTimeout(() => { // simulate forgot password action, replace with your api call
        this.loading = false;
        this.forgotPasswordResponse['success'] = true;
        this.forgotPasswordResponse['text'] = "Password reset link emailed to " + payload;
      }, 1500);
    },

    async createAccountAction(payload) {
      this.loading = true;
      this.creaetAccountResponse['text'] = '';

      setTimeout(() => { // simulate forgot password action, replace with your api call
        this.loading = false;
        this.creaetAccountResponse['success'] = true;
        this.creaetAccountResponse['text'] = "Account created! Please check your inbox and validate your account";
      }, 1500);
    }
  },

  getters: { // Getters in pinia are computed properties for the store
  }
})
