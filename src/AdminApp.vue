<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import AdminNavBar from './components/Navigation/AdminNavBar.vue';
import LogOutButton from './components/Auth/LogOutButton.vue';

const store = useStore();
const route = useRoute();
const isLoginPage = computed(() => route.name === 'login');
const isSidebarCollapsed = ref(false);

const userId = computed(() => localStorage.getItem('UserId'));
</script>

<template>
  <h1>Admin</h1>
  <div v-if="store.state.isAuthenticated" class="app-container">
    <header class="header">
      <button class="menu-toggle" @click="isSidebarCollapsed = !isSidebarCollapsed">
        <span class="material-symbols-outlined">menu</span>
      </button>
      <h1 class="logo">FROGCREW</h1>
      <div class="header-icons">
        <button class="icon-button" v-if="!$route.meta.hideNavbar">
          <span class="material-symbols-outlined">notifications</span>
        </button>
        <RouterLink :to="`/profile/${userId}`" class="icon-button" v-if="!$route.meta.hideNavbar">
          <span class="material-symbols-outlined">person</span>
        </RouterLink>
        <LogOutButton />
      </div>
    </header>
    <div class="main-container">
      <AdminNavBar 
        v-if="!$route.meta.hideNavbar" 
        :isSidebarCollapsed="isSidebarCollapsed" 
      />
      <main class="main-content" :class="{ 'collapsed': isSidebarCollapsed }">
        <RouterView />
      </main>
    </div>
  </div>
  <div v-else class="login">
    
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
  margin-bottom: 0;
}

/* Keep any other global styles you have */
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
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #4B2E83;
  color: white;
}

.menu-toggle {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  height: 40px;
  width: 40px;
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

.main-content.collapsed {
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

.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
}

.header-icons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.material-symbols-outlined {
  font-size: 24px;
  line-height: 1;
}

</style>

