<script setup lang="ts">
import RegistrationForm from './components/RegistrationForm.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex flex-col">
    <!-- Main content -->
    <div class="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div class="absolute top-20 left-20 w-64 h-64 bg-primary-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-64 h-64 bg-primary-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style="animation-delay: 1s"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-100/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style="animation-delay: 2s"></div>
      </div>
      
      <div class="w-full max-w-3xl relative">
        <div class="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-2xl transform rotate-1"></div>
        <div class="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-2xl transform -rotate-1"></div>
        <RegistrationForm />
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white/80 backdrop-blur-sm border-t border-gray-200">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Logo and copyright -->
          <div class="col-span-1">
            <img src="/image.png" alt="Logo" class="h-8 w-auto mb-4" />
            <p class="text-sm text-gray-600">© 2017 – 2025</p>
          </div>

          <!-- Empresa -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-4">Empresa</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-600 hover:text-primary-600 transition-colors">Nosotros</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary-600 transition-colors">Política de Privacidad</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary-600 transition-colors">Términos y condiciones</a></li>
            </ul>
          </div>

          <!-- Redes Sociales -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-4">Redes Sociales</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-600 hover:text-primary-600 transition-colors">TikTok</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary-600 transition-colors">Instagram</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary-600 transition-colors">Facebook</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary-600 transition-colors">Youtube</a></li>
            </ul>
          </div>

          <!-- Contacto -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-4">Contacto</h3>
            <ul class="space-y-3">
              <li class="text-gray-600">(+51) 932 531 441</li>
              <li><a href="mailto:info@probusiness.pe" class="text-gray-600 hover:text-primary-600 transition-colors">info@probusiness.pe</a></li>
              <li class="text-gray-600">Alberto Barton 527 - La Victoria - Perú</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>