<template>
  <div class="crew-schedule-container">
    <!-- Action Selector -->
    <div class="action-selector">
      <button 
        v-for="action in actions" 
        :key="action.id"
        :class="['action-btn', { active: currentAction === action.id }]"
        @click="currentAction = action.id"
      >
        {{ action.label }}
      </button>
    </div>

    <!-- Search Bar - Only shown for Find action -->
    <div v-if="currentAction === 'find'" class="search-container">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search by Game ID or Crew Member..."
        class="search-input"
      />
      <button @click="handleSearch" class="search-btn">Search</button>
    </div>

    <!-- Component Display Area -->
    <div class="component-container">
      <AddCrewSchedule v-if="currentAction === 'add'" />
      <FindCrewSchedule 
        v-if="currentAction === 'find'" 
        :searchQuery="searchQuery"
      />
      <UpdateCrewSchedule 
        v-if="currentAction === 'update'" 
        :scheduleToUpdate="selectedSchedule"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AddCrewSchedule from '../components/CrewSchedule/AddCrewSchedule.vue'
import FindCrewSchedule from '../components/CrewSchedule/FindCrewSchedule.vue'
import UpdateCrewSchedule from '../components/CrewSchedule/UpdateCrewSchedule.vue'

const actions = [
  { id: 'add', label: 'Add Schedule' },
  { id: 'find', label: 'Find Schedule' },
  { id: 'update', label: 'Update Schedule' }
]

const currentAction = ref('add')
const searchQuery = ref('')
const selectedSchedule = ref(null)

const handleSearch = () => {
  // This will be implemented in the FindCrewSchedule component
  console.log('Searching for:', searchQuery.value)
}
</script>

<style scoped>
.crew-schedule-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.action-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.action-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.active {
  background-color: #563d7c;
  color: white;
}

.search-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.search-btn {
  padding: 10px 20px;
  background-color: #563d7c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-btn:hover {
  opacity: 0.9;
}

.component-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style> 