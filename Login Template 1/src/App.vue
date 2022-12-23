<template>
    <RouterView />
</template>

<script>
  import { onMounted } from 'vue';
  import { useThemeStore } from './stores/theme.js'

  export default {
    setup() {
      onMounted(() => {
        const themeStore = useThemeStore(); // get whole store like this without destructuring to keep reactivity (otherwise will need to import storeToRefs helper from pinia)
        
        if(getMediaPreference() == 'dark-mode') { // Check if user's device is in dark mode and apply dark mode to the page if it is. To test the other view for development, change == with !=
          document.body.classList.add('dark-mode'); // dark-mode class is defined in src/assets/scss/custom.scss
          themeStore.setThemeAction('dark-mode'); // Save the current theme at pinia so other components can easily access it when needed

        } else {
          document.body.classList.add('light-mode'); // light-mode class is defined in src/assets/scss/custom.scss
          themeStore.setThemeAction('light-mode'); // Save the current theme at pinia so other components can easily access it when needed
        }
      })

      function getMediaPreference() {
        const hasDarkPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (hasDarkPreference) {
          return "dark-mode";
        } else {
          return "light-mode";
        }
      }
      
    },
  }
</script>

<style lang="scss">

  html {
    height: 100% !important;
    font-family: "Metrisch" !important;
    font-weight: 500 !important;
    font-style: normal !important;
    font-size: 13px; // Shrink default font size globally
  }
  body {
    font-family: "Metrisch" !important;
    font-weight: 500 !important;
    font-style: normal !important;
    background: var(--background-color) !important;
    color: var(--text-color);
    height: 100% !important;
    margin: 0;
  }

  #app {
    font-family: "Metrisch" !important;
    font-weight: 500 !important;
    font-style: normal !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100% !important;
    overflow-y: auto;
  }

  /* Globally set button colors */
  button {
    background-color:var(--button-color) !important; 
    color:var(--button-text-color) !important;
    font-weight: 500 !important;
  }

  /* Globally set scrollbar properties*/
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  // Globally set hyperlink style
  .hyperlink {
      color:var(--hyperlink-color);
      text-decoration:underline;
      cursor:pointer;
  }
</style>