<script setup lang="ts">
import RegistrationForm from './components/RegistrationForm.vue'
</script>

<template>
  <div class="min-h-screen  flex flex-col background" >
    <!-- Main content -->
    <div class="flex-grow flex py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden self-end"
    style="max-width: 800px;display: flex;width: 100%;align-items: flex-end;justify-content: right;"
    >
      <!-- Decorative elements -->
      <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div class="absolute top-20 left-20 w-64 h-64 bg-primary-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-64 h-64 bg-primary-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style="animation-delay: 1s"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-100/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style="animation-delay: 2s"></div>
      </div>
      
      <div class="w-full max-w-5xl relative ">

        <RegistrationForm />
      </div>
    </div>

  </div>
</template>
<style scoped>
.background{
  background-image: url('/src/assets/background.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
}
</style>