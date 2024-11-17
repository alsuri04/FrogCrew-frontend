<template>
  <nav class="sidebar" :class="{ collapsed: isSidebarCollapsed }">
    <div class="nav-item">
      <RouterLink to="/" class="nav-link">
        <span class="nav-icon">◫</span>
        <span class="nav-text">Homepage</span>
      </RouterLink>
    </div>
    <div class="nav-item">
      <div class="nav-link" @click="isScheduleOpen = !isScheduleOpen">
        <span class="nav-icon">◫</span>
        <span class="nav-text">Schedule</span>
        <span class="dropdown-arrow" :class="{ 'rotated': isScheduleOpen }">▼</span>
      </div>
      <div class="submenu" v-show="isScheduleOpen">
        <RouterLink to="/schedule/crew" class="nav-link submenu-link">
          <span class="nav-icon">◫</span>
          <span class="nav-text">Crew Schedules</span>
        </RouterLink>
        <RouterLink to="/schedule/crewList" class="nav-link submenu-link">
          <span class="nav-icon">◫</span>
          <span class="nav-text">Crew List</span>
        </RouterLink>
        <RouterLink to="/schedule/games" class="nav-link submenu-link">
          <span class="nav-icon">◫</span>
          <span class="nav-text">Game Schedules</span>
        </RouterLink>
      </div>
    </div>
    <div class="nav-item">
      <div class="nav-link" @click="isCrewOpen = !isCrewOpen">
        <span class="nav-icon">◫</span>
        <span class="nav-text">Crew Members</span>
        <span class="dropdown-arrow" :class="{ 'rotated': isCrewOpen }">▼</span>
      </div>
      <div class="submenu" v-show="isCrewOpen">
        <RouterLink to="/crew-members/manage" class="nav-link submenu-link">
          <span class="nav-icon">◫</span>
          <span class="nav-text">Manage Members</span>
        </RouterLink>
        <RouterLink to="/crew-members/invite" class="nav-link submenu-link">
          <span class="nav-icon">◫</span>
          <span class="nav-text">Invite Members</span>
        </RouterLink>
        <RouterLink to="/availability" class="nav-link submenu-link">
          <span class="nav-icon">◫</span>
          <span class="nav-text">Availability</span>
        </RouterLink>
        <RouterLink to="/crew-members/create-profile" class="nav-link submenu-link">
          <span class="nav-icon">◫</span>
          <span class="nav-text">Create Profile</span>
        </RouterLink>
      </div>
    </div>
    <div class="nav-item">
      <RouterLink to="/reports" class="nav-link">
        <span class="nav-icon">◫</span>
        <span class="nav-text">Reports</span>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isSidebarCollapsed = ref(false);
const isScheduleOpen = ref(false);

const isCrewOpen = ref(false);
</script>

const isLoginPage = computed: {
  hide () {
    return this.$route.path === '/login'; 
  }
 }


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

.submenu {
  background-color: #f0f0f0;
  padding-left: 1rem;
}

.submenu-link {
  padding-left: 2rem;
  font-size: 0.85rem;
}
</style>
