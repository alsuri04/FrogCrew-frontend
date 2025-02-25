<template>
    <nav class="sidebar" :class="{ collapsed: isSidebarCollapsed }">
      <div class="nav-item">
        <RouterLink to="/home" class="nav-link" :class="{ 'active': $route.path === '/home' }">
          <span class="material-symbols-outlined nav-icon">home</span>
          <span class="nav-text" v-show="!isSidebarCollapsed">Homepage</span>
        </RouterLink>
      </div>
      <div class="nav-item">
        <RouterLink to="/schedule/crewList" 
                   class="nav-link"
                   :class="{ 'active': $route.path === '/schedule/crewList' }">
          <span class="material-symbols-outlined nav-icon">calendar_month</span>
          <span class="nav-text" v-show="!isSidebarCollapsed">Schedule</span>
        </RouterLink>
      </div>
      <div class="nav-item">
        <RouterLink to="/tradeboard" 
                   class="nav-link"
                   :class="{ 'active': $route.path === '/tradeboard' }">
          <span class="material-symbols-outlined nav-icon">swap_horiz</span>
          <span class="nav-text" v-show="!isSidebarCollapsed">Trade Board</span>
        </RouterLink>
      </div>
      <div class="nav-item" v-if="isAdmin">
        <div class="nav-link" 
             @click="isCrewOpen = !isCrewOpen"
             :class="{ 'active': $route.path.includes('/crew-members') || $route.path === '/availability' }">
          <span class="material-symbols-outlined nav-icon">groups</span>
          <span class="nav-text" v-show="!isSidebarCollapsed">Crew Members</span>
          <span v-show="!isSidebarCollapsed" class="dropdown-arrow" :class="{ 'rotated': isCrewOpen }">▼</span>
        </div>
        <div class="submenu" v-show="isCrewOpen && !isSidebarCollapsed">
          <RouterLink to="/Availability" 
                     class="nav-link submenu-link"
                     :class="{ 'active': $route.path === '/Availability' }">
            <span class="material-symbols-outlined nav-icon">event_available</span>
            <span class="nav-text">Availability</span>
          </RouterLink>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const isAdmin = computed(() => store.state.isAdmin);
  
  const route = useRoute();
  const isCrewOpen = ref(false);
  
  defineProps({
    isSidebarCollapsed: {
      type: Boolean,
      required: true
    }
  });
  
  const isLoginPage = computed(() => {
    return route.path === '/login';
  });
  </script>
  
  <style scoped>
  .sidebar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #f5f5f5;
    width: 250px;
    transition: width 0.3s ease;
    overflow-x: hidden;
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
    color: #000 !important;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    position: relative;
  }
  
  .nav-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    flex-shrink: 0;
  }
  
  .nav-text {
    transition: opacity 0.3s ease;
    opacity: 1;
  }
  
  .sidebar.collapsed .nav-text {
    opacity: 0;
  }
  
  .material-symbols-outlined {
    font-size: 24px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .nav-link:hover,
  .nav-link:visited,
  .nav-link:active {
    background-color: #e8e8e8;
    color: #000 !important;
  }
  
  .nav-link.active {
    background-color: #e8e8e8;
    color: #000 !important;
  }
  
  .nav-link.active .nav-icon,
  .nav-link.active .dropdown-arrow {
    color: #000 !important;
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
  
  .submenu {
    background-color: #f0f0f0;
    padding-left: 1rem;
  }
  
  .submenu-link {
    padding-left: 2rem;
    font-size: 0.85rem;
  }
  
  .submenu-link.active {
    background-color: #e0e0e0;
    color: var(--tcu-purple);
  }
  </style>
  