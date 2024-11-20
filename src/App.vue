<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import NavBar from './components/Navigation/NavBar.vue';
import LoginView from './views/LoginView.vue';

const router = useRouter();
const store = useStore();
const route = useRoute();
const showLogoutConfirm = ref(false);

const handleLogout = () => {
  // Clear authentication
  store.commit('setAuthentication', false);
  store.commit('setIsAdmin', false);
  // Clear local storage
  localStorage.removeItem('authToken');
  localStorage.removeItem('UserId');
  // Close the modal
  showLogoutConfirm.value = false;
  // Redirect to login page
  router.push('/login');
};
</script>

<template>
  <div v-if="$store.state.isAuthenticated" class="app-container">
    <!-- Header -->
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
        <button class="icon-button" v-if="!$route.meta.hideNavbar" @click="showLogoutConfirm = true">
          <span class="material-symbols-outlined">logout</span>
        </button>
      </div>
    </header>

    <div class="main-container">
      <!-- Sidebar -->
      <NavBar v-if="!$route.meta.hideNavbar">
        <RouterView></RouterView>
      </NavBar>

      <!-- Main Content -->
      <main class="main-content">
        <RouterView />
      </main>
    </div>
  </div>
  <div v-else class="login">
    <LoginView></LoginView>
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

<style>
/* Reset styles */
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

/* Keep any other global styles you have */

/* Add this Material Symbols styling */
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  color: white;
  -webkit-font-smoothing: antialiased;
}

/* Adjust icon button styling */
.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
}

.icon-button:hover {
  opacity: 0.8;
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
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal h3 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.1rem;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.btn-logout {
  background-color: #563d7c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-cancel {
  background-color: white;
  color: #563d7c;
  border: 1px solid #563d7c;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-logout:hover {
  background-color: #472f6a;
}

.btn-cancel:hover {
  background-color: #f5f5f5;
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
  gap: 8px;
  padding-right: 8px;
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


</style>

