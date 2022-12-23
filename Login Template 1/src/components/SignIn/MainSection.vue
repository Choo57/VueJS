<template>
    <div class="mx-auto col-10 col-xs-8 col-sm-8 col-md-6 col-lg-6" style="max-width:380px">
        <div class="row">
            <!-- Company logo -->
            <div class="col" style="margin-bottom:20px">
                <img style="max-width:100%; max-height:100px" alt="Logo" src="../../assets/logo/logo-no-background.png"/>
            </div>
        </div>
        <div class="row">
            <div class="col mx-auto">
                <!-- Components for each page; creaet-account, forgot-password, sign-in -->
                <create-account v-if="page=='createaccount'" @changePage="getChangePage"/>
                <forgot-password v-else-if="page=='forgotpassword'" @changePage="getChangePage"/>
                <sign-in v-else @changePage="getChangePage"/>
            </div>
        </div>
        <div class="row" style="margin-top:60px">
            <!-- Footer component at the bottom of the page -->
            <footer-block/>
        </div>
    </div>
</template>

<script>
import SignIn from './SignIn.vue';
import CreateAccount from './CreateAccount.vue';
import ForgotPassword from './ForgotPassword.vue';
import FooterBlock from './FooterBlock.vue';
import { ref } from "vue";

export default {
  components: { FooterBlock, SignIn, CreateAccount, ForgotPassword },
    setup() {
        const page = ref('signin'); // Default landing page set as the signin component
        const password = ref('');
        const showPassword = ref(false);

        function toggleShowPassword() {
            showPassword.value = !showPassword.value;
        }

        function getChangePage(val){ // Gets emitted page from the sign-in, create-account & forgot-password components and changes to the displayed page accordingly
            page.value=val;
        }

        return { showPassword, toggleShowPassword, password, page, getChangePage }    
    },
}
</script>

<style lang="scss" scoped>

  .hide-scrollbar {
      overflow-y: scroll;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none;  /* Internet Explorer 10+ */
  }
  .hide-scrollbar::-webkit-scrollbar { /* WebKit */
      width: 0;
      height: 0;
  }
</style>