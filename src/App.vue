<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from './components/Navigation/NavBar.vue';
import LoginView from './views/LoginView.vue';

const showLogin = true;

const route = useRoute();
const isLoginPage = computed(() => route.name === 'login');
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
        <button class="icon-button" v-if="!$route.meta.hideNavbar">🔔</button>
        <button class="icon-button" v-if="!$route.meta.hideNavbar">👤</button>
        <button class="icon-button" v-if="!$route.meta.hideNavbar">➜</button>
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
</template>

<style>
/* Reset styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}
</style>

