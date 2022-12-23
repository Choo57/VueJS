<template>
    <div class="text-start" style="color:var(--text-color)">
        <!-- Create an account page heading -->
        <div class="card">
            <div class="card-body px-0" style="padding-bottom:0px">
                <span class="card-title" style="font-size:1.5rem;">Create a new My Company account</span>
            </div>
        </div>

        <!-- Name input -->
        <div class="form-floating mt-3 formText">
            <input type="text" class="form-control" id="name" placeholder="name" v-model="name" @keyup.enter="register()">
            <label for="name" class="form-label">Name</label>
        </div>
        <!-- Name validation message -->
        <div v-if="!nameValidation.valid" class="card text-start">
            <div class="card-body validationMsgBody">
                <span class="card-title validationMsg" :style="nameValidation.valid ? {'color':'var(--success)'} : {'color':'var(--danger)'}">{{ nameValidation.msg }}</span>
            </div>
        </div>

        <!-- Email inout -->
        <div class="form-floating mt-3 formText">
            <input type="email" class="form-control" id="email" placeholder="email" v-model="email" @keyup.enter="register()">
            <label for="email" class="form-label">Email</label>
        </div>
        <!-- Email validation message -->
        <div v-if="!emailValidation.valid" class="card text-start">
            <div class="card-body validationMsgBody" >
                <span class="card-title validationMsg" :style="emailValidation.valid ? {'color':'var(--success)'} : {'color':'var(--danger)'}">{{ emailValidation.msg }}</span>
            </div>
        </div>

        <!-- Password input -->
        <div style="position:relative;">
            <span class="showPassword">
                <i v-if="showPassword" class="bi bi-eye-slash" @click="toggleShowPassword()"></i>
                <i v-else class="bi bi-eye" @click="toggleShowPassword()"></i>
            </span>
            <div class="form-floating mt-3 formText">
                <input v-if="showPassword" type="text" class="form-control" id="password"  placeholder="password" v-model="password" @keyup.enter="register()">
                <input v-else type="password" class="form-control" id="password"  placeholder="password" v-model="password"  @keyup.enter="register()">
                <label for="password" class="form-label">Password</label>
            </div>
            <!-- Password validation message -->
            <div v-if="!passwordValidation.valid" class="card text-start">
                <div class="card-body validationMsgBody">
                    <span class="card-title validationMsg" :style="passwordValidation.valid ? {'color':'var(--success)'} : {'color':'var(--danger)'}">{{ passwordValidation.msg }}</span>
                </div>
            </div>
        </div>

        <!-- Terms & conditions checkbox -->
        <div class="form-check mt-3">
            <input class="form-check-input" type="checkbox" value="" id="agree" v-model="agreeTerms">
            <label class="form-check-label" for="agree">
                I agree to My Company <a href="https://mycompany.com/terms-and-conditions">Terms & Conditions</a>
            </label>
        </div>
        <!-- Checkbox validation -->
        <div v-if="!agreeTermsValidation.valid" class="card text-start">
            <div class="card-body validationMsgBody">
                <span class="card-title validationMsg" :style="agreeTermsValidation.valid ? {'color':'var(--success)'} : {'color':'var(--danger)'}">{{ agreeTermsValidation.msg }}</span>
            </div>
        </div>

        <!-- Register button -->
        <div class="d-grid gap-3 mt-3">
            <button class="btn btn-primary btn-lg" style="color:var(--button-text-color)" type="button" @click="register()">
                <span v-if="authStore.loading"><span class="spinner-border spinner-border-sm" style="margin-right:10px;" role="status" aria-hidden="true"></span>Registering..</span>
                <span v-else>Register</span>
            </button>
        </div>
        <!-- Registration server response message -->
        <div v-if="createAccountResponse.text" class="card text-start">
            <div class="card-body" style="padding-left:0">
                <span class="card-title validationMsg" :style="createAccountResponse.success ? {'color':'var(--success)'} : {'color':'var(--danger)'}">{{ createAccountResponse.text }}</span>
            </div>
        </div>

        <!-- Sign in instead link -->
        <div class="card">
            <div class="card-body" style="padding-left:0">
                <span class="card-title validationMsg">Already have an account? <a class="hyperlink" @click="gotoLogin()">Sign in instead</a></span>
            </div>
        </div>
    </div> 
</template>

<script>
import { ref, watchEffect } from "vue";
import { useAuthStore } from '../../stores/auth';
import useValidate from "../../hooks/validate.js";

export default {
    emits: ['changePage'],
    setup(_, context) {
        const authStore = useAuthStore(); // get whole store like this without destructuring to keep reactivity (otherwise will need to import storeToRefs helper from pinia)

        const email = ref('');
        const password = ref('');
        const name = ref('');
        const agreeTerms = ref(false);
        const showPassword = ref(false);

        const nameValidation = ref({valid:true, msg:''});
        const passwordValidation = ref({valid:true, msg:''});
        const emailValidation = ref({valid:true, msg:''});
        const agreeTermsValidation = ref({valid:true, msg:''});

        const createAccountResponse = ref({success:true, text:''});

        function toggleShowPassword() {
            showPassword.value = !showPassword.value;
        }

        function gotoLogin() {
            context.emit("changePage", 'login'); // emit 'login' to the parent component and it will display the login page
        }

        watchEffect(() => { // Watch for any authentication errors and display on the page if any
            createAccountResponse.value = {...authStore.creaetAccountResponse};
        });

        function register() {
            nameValidation.value = useValidate('string', name.value, 'Name'); // Validate name using the useValidate function in the imported validate.js hook
            passwordValidation.value = useValidate('string', password.value, 'Password'); // Validate password using the useValidate function in the imported validate.js hook
            emailValidation.value = useValidate('email', email.value, 'Email'); // Validate email using the useValidate function in the imported validate.js hook
            agreeTermsValidation.value = useValidate('checkbox', agreeTerms.value, 'Checkbox', 'Please agree with the terms & conditions to proceed'); // Enforce the checkbox. Pass the custom error message 'Please agree with the terms & conditions to proceed' to the useValidate function

            let isValid = nameValidation.value['valid'] && passwordValidation.value['valid'] && emailValidation.value['valid'] && agreeTermsValidation.value['valid']; // // Check if all are valid, and only then proceed with the create account action in Pinia
            if(isValid) {
                let payload = {name:name.value, email:email.value, password:password.value};
                authStore.createAccountAction(payload);
            }
        }

        return { showPassword, toggleShowPassword, email, name, password, agreeTerms, gotoLogin, register, authStore, nameValidation, passwordValidation, emailValidation, agreeTermsValidation, createAccountResponse }    
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
         top:9px; 
         right:15px; 
         z-index:1; 
         font-size:1.4rem; 
         color:var(--dark-text);
    }

    .validationMsg {
        font-size:1rem;
    }

    .validationMsgBody {
        background-color:var(--background-color);
        padding: 5px 0px 0px 0px;
    }

    .formText {
        color:var(--dark-text);
    }
</style>