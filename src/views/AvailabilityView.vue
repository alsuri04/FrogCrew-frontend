<template>
  <div class="availability-view">
    <div class="top-nav" style="position: relative; z-index: 1;">
      <h1>Games List</h1>
      <div class="right-section">
        <div class="availability-banner">Availability</div>
        <router-link to="/sports" class="back-btn">Back to Sports</router-link>
      </div>
    </div>
    <div class="search-container">
      <input 
        type="text" 
        placeholder="Search by game, date, or location..."
        class="search-input"
      >
    </div>
    <div class="content-container">
      <AddAvailability />
    </div>
  </div>
</template>

<script setup>
import AddAvailability from '@/components/CrewMember/AddAvailability.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToCrewList = (gameId) => {
  router.push(`/schedule/crewList/game/${gameId}`)
}

const navigateToEditCrew = (gameId) => {
  router.push(`/schedule/crew/update/${gameId}`)
}
</script>

<style scoped>
.availability-view {
  padding: 20px;
  max-width: 100%;
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.availability-banner {
  background-color: #ff8c00;
  color: black;
  padding: 15px 40px;
  font-size: 24px;
  border-radius: 4px;
  display: inline-block;
}

.back-btn {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-container {
  margin: 20px 0;
}

.search-input {
  width: 300px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.content-container {
  flex: 1;
  overflow-y: auto;
  min-height: 0; /* Important for Firefox */
}
</style>
