<template>
  <div class="container-fluid vh-100 hide-scrollbar" style="color:var(--background-color)">
    <div class="row vh-100">
      <div class="col m-auto">
        <!-- Left half of the screen on large devices; main section -->
        <main-section/>
      </div>
      <div class="col d-none d-lg-block px-0">
        <!-- Right half of the page with css gradient, hidden on smaller devices -->
        <img-section/>
      </div>
    </div>
  </div>
</template>

<script>
import MainSection from '../components/SignIn/MainSection.vue'
import ImgSection from "../components/SignIn/ImgSection.vue"

export default {
  components: { ImgSection, MainSection },
  setup() {
    
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