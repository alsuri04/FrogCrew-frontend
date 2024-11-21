<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import UserNavBar from './components/Navigation/UserNavBar.vue';
import LogOutButton from './components/Auth/LogOutButton.vue';

const store = useStore();
const route = useRoute();
const isLoginPage = computed(() => route.name === 'login');
const isSidebarCollapsed = ref(false);
</script>

<template>
    <h1>User</h1>
  <div v-if="store.state.isAuthenticated" class="app-container">
    <header class="header">
      <button class="menu-toggle" @click="isSidebarCollapsed = !isSidebarCollapsed">
        <span class="menu-icon" v-if="!$route.meta.hideNavbar">☰</span>
      </button>
      <h1 class="logo">FROGCREW</h1>
      <div class="header-icons">
        <button class="icon-button" v-if="!$route.meta.hideNavbar">
          <span class="material-symbols-outlined">notifications</span>
        </button>
        <button class="icon-button" v-if="!$route.meta.hideNavbar">
          <span class="material-symbols-outlined">person</span>
        </button>
        <LogOutButton />
      </div>
    </header>
    <div class="main-container">
      <UserNavBar v-if="!$route.meta.hideNavbar" />
      <main class="main-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Playfair Display', serif;
}

html, body, #app {
  position: fixed;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* Add this to target the root div directly */
#app > div {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Playfair Display', serif;
}

body {
  background-color: #f5f5f5;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
}


</style>

<style scoped>
.app-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.header {
  background-color: #563d7c;
  color: white;
  padding: 0 15px;
  display: flex;
  align-items: center;
  height: 50px;
}

.menu-toggle {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  margin-right: 10px;
}

.logo {
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.header-icons {
  margin-left: auto;
  display: flex;
  gap: 15px;
  padding-right: 15px;
}

.icon-button {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.main-container {
  height: calc(100% - 50px);
  position: relative;
  overflow: hidden;
}

.sidebar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #f5f5f5;
  width: 250px;
  transition: width 0.3s;
  overflow-y: auto;
  z-index: 1;
}

.sidebar.collapsed {
  width: 50px;
}

.nav-item {
  padding: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  text-decoration: none;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
}

.nav-link:hover {
  background-color: #e8e8e8;
}

.nav-icon {
  margin-right: 12px;
  width: 16px;
  color: #666;
}

.nav-text {
  flex: 1;
}

.dropdown-arrow {
  margin-left: auto;
  font-size: 0.7rem;
  color: #666;
  transition: transform 0.3s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.main-content {
  position: absolute;
  left: 250px;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  background-color: #ffffff;
  transition: left 0.3s;
}

.sidebar.collapsed + .main-content {
  left: 50px;
}

.router-link-active {
  background-color: #e8e8e8;
}

.submenu {
  background-color: #f0f0f0;
  padding-left: 1rem;
}

.submenu-link {
  padding-left: 2rem;
  font-size: 0.85rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  width: 90%;
  max-width: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  background-color: #563d7c; /* TCU Purple */
  color: white;
  padding: 1rem;
  text-align: left;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.modal-content {
  padding: 2rem;
  text-align: center;
}

.modal-content h3 {
  margin-bottom: 2rem;
  font-size: 1.25rem;
  color: #333;
  font-weight: normal;
}

.modal-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-logout {
  padding: 0.75rem 2rem;
  background-color: #563d7c; /* TCU Purple */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  min-width: 120px;
}

.btn-cancel {
  padding: 0.75rem 2rem;
  background-color: white;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  min-width: 120px;
}

.btn-logout:hover {
  background-color: #472f6b; /* Darker TCU Purple */
}

.btn-cancel:hover {
  background-color: #f5f5f5;
}

</style>
