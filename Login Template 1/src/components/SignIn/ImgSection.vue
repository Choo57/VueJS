<template>
    <div class="h-100" :class="[gradientClass]">
    </div>
</template>

<script>
import { useThemeStore } from '../../stores/theme.js';
import { ref, onBeforeMount } from "vue";

export default {
    setup() {
        const store = useThemeStore();

        const gradientClass = ref('');
        
        onBeforeMount(() => {
            if(store.theme == 'dark-mode') { // Get current theme from Pinia and set the css gradient displayed on the right half of the screen on large devices
                gradientClass.value = 'bg-gradient-dark';
            } else {
                gradientClass.value = 'bg-gradient-light';
            }
        })

        return{ gradientClass }
    }
}
</script>

<style lang="scss" scoped>
    .bg-gradient-dark { // css gradient for dark mode, displayed on the right half of the screen on large devices
        background: rgb(33,37,41);
        background: linear-gradient(90deg, rgba(33,37,41,1) 0%, rgba(117,91,180,1) 100%);
    }

    .bg-gradient-light { // css gradient for light mode, displayed on the right half of the screen on large devices
        background: rgb(248,249,250);
        background: linear-gradient(90deg, rgba(248,249,250,1) 0%, rgba(117,91,180,1) 100%);
    }
</style>