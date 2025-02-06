<template>
  <div v-if="store.state.isAuthenticated" class="app-container">
    <div v-if="store.state.isAdmin">
      <AdminApp />
    </div>
    <div v-else-if="!store.state.isAdmin">
      <UserApp />
    </div>
  </div>
  <div v-else-if="path==='/register'">
    <CreateProfileView />
  </div>
  <div v-else>
      <LoginView />
  </div>

  <!-- Logout Confirmation Modal -->
  <div v-if="showLogoutConfirm" class="modal-overlay">
    <div class="modal">
      <h3>Are you sure you want to log out?</h3>
      <div class="modal-buttons">
        <button class="btn-logout" @click="handleLogout">Log out</button>
        <button class="btn-cancel" @click="showLogoutConfirm = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import {useRoute} from 'vue-router'
import AdminApp from './AdminApp.vue';
import UserApp from './UserApp.vue';
import LoginView from './views/LoginView.vue';
import CreateProfileView from './views/CreateProfileView.vue';
import router from './router';

const store = useStore();
const isAdmin = computed(() => store.state.isAdmin);
const route=useRoute();
const path = computed(() =>route.path)

window.isMobile = function(){
  return (window.matchMedia("(any-hover:none)").matches) 
};

</script>
