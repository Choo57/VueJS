<template>
    <div style="display:flex; width:210px; flex-direction:column; justify-items:center; color:lightgrey">
        <label for="email">Email</label>
        <input id="email" class="inputFont" spellcheck="false" style="margin-bottom:10px;">
        <label for="password">Password</label>
        <section style="position:relative">
            <input :type="showPassword ? 'text' : 'password'" class="inputFont" style="width:100%">
            <img v-show="!showPassword" src="./flashlight_off_w.png"
                style="position:absolute; right:-28px; top:7px; width:20px; height:13px; cursor:pointer;"
                @click=toggleShowPassword>
            <img v-show="showPassword" src="./flashlight_on_w.png"
                style="position:absolute; right:-28px; top:7px; width:20px; height:13px; cursor:pointer;"
                @click=toggleShowPassword>
            <div v-show="showPassword" class="triangle"></div>
        </section>
        <button style="margin-top:15px; width:80px; height:30px; align-self:end; cursor:pointer;">
            Sign in
        </button>
    </div>
</template>

<script setup>
import { ref } from "vue";

const showPassword = ref(false);

function toggleShowPassword() {
    showPassword.value = !showPassword.value;
}
</script>

<style scoped>
.triangle {
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 255px solid #ffd700;
    position: absolute;
    right: -10px;
    top: -6px;

    /* round the left edges of the light beam */
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    /* Add a box shadow to blur the left edge of the light beam */
    box-shadow: -20px 0 20px rgba(0, 0, 0, 0.3);

    /* Add a fade effect to the light beam from right to left */
    mask-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
    -webkit-mask-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);

    /* Disable pointer events so the user can click through the yellow triangle 'aka the light beam' to type in the password*/
    pointer-events: none;
}

input {
    /* Use monospace fonts so masked password characters and unmasked letters overlap for a smooth transition*/
    font-family: 'Lucida Console', monospace;

    height: 25px;
}


button {
    /* Smooth transition */
    transition: transform 0.1s ease;
}

button:active {
    /* Shrinks the button to 90% of its size */
    transform: scale(0.90);
}
</style>