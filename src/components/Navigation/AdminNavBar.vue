<template>
  <nav class="sidebar" :class="{ collapsed: isSidebarCollapsed }">
    <div class="nav-item">
      <RouterLink to="/home" class="nav-link" :class="{ 'active': $route.path === '/home' }">
        <span class="nav-icon">◫</span>
        <span class="nav-text">Homepage</span>
      </RouterLink>
    </div>
    <div class="nav-item">
      <RouterLink to="/schedule/crewList" 
                 class="nav-link"
                 :class="{ 'active': $route.path === '/schedule/crewList' }">
        <span class="nav-icon">◫</span>
        <span class="nav-text">Schedule</span>
      </RouterLink>
    </div>
    <div class="nav-item">
      <div class="nav-link" 
           @click="isCrewOpen = !isCrewOpen"
           :class="{ 'active': $route.path.includes('/crew-members') || $route.path === '/availability' || $route.path === '/create-profile' }">
        <span class="nav-icon">◫</span>
        <span class="nav-text">Crew Members</span>
        <span class="dropdown-arrow" :class="{ 'rotated': isCrewOpen }">▼</span>
      </div>
      <div class="submenu" v-show="isCrewOpen">
        <RouterLink to="/crew-members/manage" 
                   class="nav-link submenu-link"
                   :class="{ 'active': $route.path === '/crew-members/manage' }">
          <span class="nav-icon">◫</span>
          <span class="nav-text">Manage / Invite Members</span>
        </RouterLink>
        <RouterLink to="/availability" 
                   class="nav-link submenu-link"
                   :class="{ 'active': $route.path === '/availability' }">
          <span class="nav-icon">◫</span>
          <span class="nav-text">Availability</span>
        </RouterLink>
        <RouterLink to="/create-profile" 
                   class="nav-link submenu-link"
                   :class="{ 'active': $route.path === '/create-profile' }">
          <span class="nav-icon">◫</span>
          <span class="nav-text">Create Profile</span>
        </RouterLink>
      </div>
    </div>
    <div class="nav-item">
      <RouterLink to="/reports" 
                 class="nav-link"
                 :class="{ 'active': $route.path === '/reports' }">
        <span class="nav-icon">◫</span>
        <span class="nav-text">Reports</span>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isSidebarCollapsed = ref(false);
const isCrewOpen = ref(false);

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
  color: #666 !important;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link:visited,
.nav-link:active {
  background-color: #e8e8e8;
  color: #666 !important;
}

.nav-link.active {
  background-color: #e8e8e8;
  color: #666 !important;
}

.nav-link.active .nav-icon,
.nav-link.active .dropdown-arrow {
  color: #666;
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
