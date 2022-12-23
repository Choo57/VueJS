<template>
    <section>
        <!-- Reset password heading -->
        <div class="card">
            <div class="card-body  px-0" style="color:var(--text-color); text-align:left">
                <span class="card-title" style="font-size:1.5rem;">Reset password</span>
            </div>
        </div>

        <!-- Email input -->
        <div class="form-floating mb-3" style="color:var(--dark-text)">
            <input type="email" class="form-control" id="email" placeholder="email" v-model="email" @keyup.enter="forgotPassword()">
            <label for="email" class="form-label">Enter Email</label>
        </div>

        <!-- Send reset link button -->
        <div class="d-grid gap-3">
            <button class="btn btn-lg" style="width:100%" type="button" @click="forgotPassword()">
                <span v-if="authStore.loading"><span class="spinner-border spinner-border-sm" style="margin-right:10px;" role="status"></span>Sending Reset Link</span>
                <span v-else>Send Reset Link</span>   
            </button>
        </div>
        <!-- Email validation message -->
        <div v-if="emailValidation.msg" class="card text-start">
            <div class="card-body" style="padding-left:0; padding-bottom:0">
                <span class="card-title validationMsg" :style="emailValidation.valid ? {'color':'var(--success)'} : {'color':'var(--danger)'}">{{ emailValidation.msg }}</span>
            </div>
        </div>
        <!-- Reset password link server response message -->
        <div v-if="forgotPasswordResponse.text" class="card text-start">
            <div class="card-body" style="padding-left:0; padding-bottom:0">
                <span class="card-title validationMsg" :style="forgotPasswordResponse.success ? {'color':'var(--success)'} : {'color':'var(--danger)'}">{{ forgotPasswordResponse.text }}</span>
            </div>
        </div>

        <!-- Return to login page link -->
        <div class="card text-start">
            <div class="card-body" style="padding-left:0">
                <span class="card-title validationMsg"><a class="hyperlink" @click="gotoLogin()">Return to login</a></span>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useAuthStore } from '../../stores/auth.js';
import useValidate from "../../hooks/validate.js";

export default {
    emits: ['changePage'],
    setup(_, context) {
        const authStore = useAuthStore(); // get whole store like this without destructuring to keep reactivity (otherwise will need to import storeToRefs helper from pinia)
        const email = ref('');

        const emailValidation = ref({valid:true, msg:''});
        const forgotPasswordResponse = ref({success:true, text:''});

        function gotoLogin() {
            context.emit("changePage", 'login'); // emit 'login' to the parent component and it will display the login page
        }

        watchEffect(() => { // Watch for any authentication errors and display on the page if any
            if (authStore.forgotPasswordResponse['text']) {
                forgotPasswordResponse.value = {...authStore.forgotPasswordResponse};
            }
        });

        function forgotPassword() {
            emailValidation.value = useValidate('email', email.value, 'Email'); // Validate email using the useValidate function in the imported validate.js hook

            if(emailValidation.value['valid']) {
                authStore.forgotPasswordAction(email.value);
            }
        }

        return { gotoLogin, forgotPassword, email, emailValidation, forgotPasswordResponse, authStore }    
    },
}
</script>

<style lang="scss" scoped>
    .card {
        border-width:0; // Remove the borders of Bootstrap's card class
    }

    div {
        background-color:var(--background-color);
    }

    .validationMsg {
        font-size:1rem;
    }
</style>