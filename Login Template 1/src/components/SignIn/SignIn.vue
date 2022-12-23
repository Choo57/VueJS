<template>
    <div style="color:var(--text-color)">
        <!-- Sign in heading -->
        <div class="card">
            <div class="card-body  px-0" style="text-align:left">
                <div class="card-title" style="font-size:1.5rem;">Sign in</div>
            </div>
        </div>

        <!-- Email input -->
        <div class="form-floating" style="color:var(--dark-text)">
            <input type="email" class="form-control" id="email" placeholder="email" v-model="email" @keyup.enter="signIn()">
            <label for="email" class="form-label">Email</label>
        </div>
        <!-- Email validation error message -->
        <div v-if="emailValidation.msg" class="card text-start">
            <div class="card-body validationMsgBody">
                <span class="card-title validationMsg">{{ emailValidation.msg }}</span>
            </div>
        </div>

        <!-- Password input -->
        <div class="mt-3" style="position:relative;">
            <span class="showPassword">
                <i v-if="showPassword" class="bi bi-eye-slash" @click="toggleShowPassword()"></i>
                <i v-else class="bi bi-eye" @click="toggleShowPassword()"></i>
            </span>
            <div class="form-floating" style="color:var(--dark-text)">
                <input v-if="showPassword" type="text" class="form-control" id="password"  placeholder="password" v-model="password" @keyup.enter="signIn()">
                <input v-else type="password" class="form-control" id="password"  placeholder="password" v-model="password" @keyup.enter="signIn()">
                <label for="password" class="form-label">Password</label>
            </div>
        </div>
        <!-- Password validation error message -->
        <div v-if="passwordValidation.msg" class="card text-start">
            <div class="card-body validationMsgBody">
                <span class="card-title validationMsg">{{ passwordValidation.msg }}</span>
            </div>
        </div>

        <!-- Remember me checkbox & forgot password page link -->
        <div class="form-check mt-3">
            <div>
                <div style="float:right; width:50%; text-align:right">
                    <label><a class="hyperlink" @click="gotoForgotPassword()">Forgot Password?</a></label>
                </div>
            </div>
            <div style="float:left; width:50%; text-align:left">
                <input class="form-check-input" type="checkbox" value="" id="rememberMe">
                <label class="form-check-label" for="rememberMe">
                    Remember me
                </label>
            </div>
        </div>

        <!-- Sign in button -->
        <div class="gap-3 mt-3" style="width:100%">
            <button class="btn btn-lg" style="width:100%" type="button" @click="signIn()">
                <span v-if="authStore.loading"><span class="spinner-border spinner-border-sm" style="margin-right:10px;" role="status" aria-hidden="true"></span>Signing in..</span>
                <span v-else>Sign in</span>   
            </button>
        </div>
        <!-- Sign in server response message-->
        <div v-if="signInResponse.text" class="card text-start">
            <div class="card-body" style="padding:2px 0px">
                <span class="card-title validationMsg">{{ signInResponse.text }}</span>
            </div>
        </div>
        
        <!-- Create an account page link -->
        <div class="card text-start">
            <div class="card-body" style="padding:5px 0">
                <span class="card-title" style="font-size:1rem;">New on our platform? <a class="hyperlink" @click="gotoCreateAccount()">Create an account</a></span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useAuthStore } from '../../stores/auth';
import useValidate from "../../hooks/validate.js"; // Import the validation hook used across all pages

export default {
    emits: ['changePage'],
    setup(_, context) {
        const authStore = useAuthStore(); // get whole store like this without destructuring to keep reactivity (otherwise will need to import storeToRefs helper from pinia)

        const email = ref('');
        const password = ref('');
        const passwordValidation = ref({valid:true, msg:''});
        const emailValidation = ref({valid:true, msg:''});
        const signInResponse = ref({success:true, text:''});

        const showPassword = ref(false);

        function toggleShowPassword() {
            showPassword.value = !showPassword.value;
        }

        function gotoCreateAccount() {
            context.emit("changePage", 'createaccount'); // emit 'createaccount' to the parent component and it will display the Create Account component
        }

        function gotoForgotPassword() {
            context.emit("changePage", 'forgotpassword'); // emit 'forgotpassword' to the parent component and it will display the Forgot Password component
        }

        watchEffect(() => { // Watch for any authentication errors and display on the page if any
            signInResponse.value = {...authStore.signInResponse};
        });

        function signIn() {
            passwordValidation.value = useValidate('string', password.value, 'Password'); // Validate password using the useValidate function in the imported validate.js hook
            emailValidation.value = useValidate('email', email.value, 'Email'); // Validate email using the useValidate function in the imported validate.js hook

            let isValid = passwordValidation.value['valid'] && emailValidation.value['valid']; // Check if both email and password are valid, and only then proceed with the sign in action in Pinia
            if(isValid) {
                let payload = {email:email.value, password:password.value};
                authStore.signInAction(payload);
            }
        }

        return { showPassword, toggleShowPassword, password, email, passwordValidation, emailValidation, gotoCreateAccount, gotoForgotPassword, signIn, signInResponse, authStore}
    },
}
</script>

<style scoped>
    div {
        background-color:var(--background-color);
    }

    /* Remove the borders of Bootstrap's card class */
    .card {
        border-width:0;
    }

    .showPassword {
         position:absolute; 
         bottom:9px; 
         right:15px; 
         z-index:1; 
         font-size:1.4rem; 
         color:var(--dark-text);
    }

    .validationMsg {
        font-size:1rem;
        color:var(--danger);
    }

    .validationMsgBody {
        background-color:var(--background-color);
        padding:2px 0px
    }
</style>