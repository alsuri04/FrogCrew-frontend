<template>
  <div v-if="store.state.isAuthenticated" class="app-container">
    <div v-if="store.state.isAdmin">
      <AdminApp />
    </div>
    <div v-else-if="!store.state.isAdmin">
      <UserApp />
    </div>
  </div>
  <div v-else>
    <LoginView />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import AdminApp from './AdminApp.vue';
import UserApp from './UserApp.vue';
import LoginView from './views/LoginView.vue';

const store = useStore();
const isAdmin = computed(() => store.state.isAdmin);
</script>
