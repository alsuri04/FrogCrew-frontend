<script setup>
import { ref } from 'vue'
import AddCrewSchedule from '../components/CrewSchedule/AddCrewSchedule.vue'
import UpdateCrewSchedule from '../components/CrewSchedule/UpdateCrewSchedule.vue'
import FindCrewSchedule from '../components/CrewSchedule/FindCrewSchedule.vue'

const activeTab = ref('events')
const currentAction = ref('')
const showAddSportForm = ref(false)
const newSportName = ref('')

// Add sample data (replace with your actual data store/API later)
const sports = ref([
  { id: 1, name: "Men's Football 2024" },
  { id: 2, name: "Women's Soccer 2024" },
  { id: 3, name: "Women's Basketball 2024" },
  { id: 4, name: "Men's Baseball 2024" }
])

const schedules = ref([
  { id: 1, sportId: 1, name: 'Football vs. Houston 10/4', status: 'submitted' },
  { id: 2, sportId: 2, name: 'Soccer vs. Tech 10/10', status: 'submitted' },
  { id: 3, sportId: 3, name: 'WBB vs. UCF 10/20', status: 'in-progress' },
  { id: 4, sportId: 3, name: 'MBB vs. SMU 12/3', status: 'in-progress' },
  { id: 5, sportId: 4, name: 'Baseball vs. Tech 4/3', status: 'not-started' }
])

// Methods
const addNewSport = () => {
  if (newSportName.value.trim()) {
    sports.value.push({
      id: sports.value.length + 1,
      name: newSportName.value.trim()
    })
    newSportName.value = ''
    showAddSportForm.value = false
  }
}

const viewSchedule = (scheduleId) => {
  // Navigate to schedule detail view
  // You'll need to set up this route in your router
  router.push(`/schedule/${scheduleId}`)
}
</script>

<template>
  <div class="crew-schedule">
    <header class="header">
      <h1>Schedule</h1>
      <div class="tabs">
        <button 
          :class="['tab', { active: activeTab === 'events' }]" 
          @click="activeTab = 'events'"
        >
          Events
        </button>
        <button 
          :class="['tab', { active: activeTab === 'crew' }]" 
          @click="activeTab = 'crew'"
        >
          Crew
        </button>
      </div>
      <div class="actions">
        <button v-if="activeTab === 'events'" class="create-btn">
          Create Schedule: Select Sport
        </button>
        <button v-if="activeTab === 'crew'" class="back-btn">
          Back To Event List
        </button>
      </div>
    </header>

    <div v-if="activeTab === 'events'" class="schedule-sections">
      <div class="section">
        <h3>Sports</h3>
        <ul class="sports-list">
          <li v-for="sport in sports" :key="sport.id">
            {{ sport.name }}
          </li>
        </ul>
        <div v-if="showAddSportForm" class="add-sport-form">
          <input 
            v-model="newSportName"
            placeholder="Enter sport name"
            @keyup.enter="addNewSport"
          >
          <button @click="addNewSport" class="save-btn">Save</button>
          <button @click="showAddSportForm = false" class="cancel-btn">Cancel</button>
        </div>
        <button v-else @click="showAddSportForm = true" class="add-btn">Add New</button>
      </div>

      <div class="section submitted">
        <h3>Submitted</h3>
        <ul>
          <li 
            v-for="schedule in schedules.filter(s => s.status === 'submitted')" 
            :key="schedule.id"
            @click="viewSchedule(schedule.id)"
            class="schedule-item"
          >
            {{ schedule.name }}
          </li>
        </ul>
      </div>

      <div class="section in-progress">
        <h3>In Progress</h3>
        <ul>
          <li 
            v-for="schedule in schedules.filter(s => s.status === 'in-progress')" 
            :key="schedule.id"
            @click="viewSchedule(schedule.id)"
            class="schedule-item"
          >
            {{ schedule.name }}
          </li>
        </ul>
      </div>

      <div class="section not-started">
        <h3>Not Started</h3>
        <ul>
          <li 
            v-for="schedule in schedules.filter(s => s.status === 'not-started')" 
            :key="schedule.id"
            @click="viewSchedule(schedule.id)"
            class="schedule-item"
          >
            {{ schedule.name }}
          </li>
        </ul>
      </div>
    </div>

    <div v-if="activeTab === 'crew'" class="crew-view">
      <AddCrewSchedule v-if="currentAction === 'add'" />
      <UpdateCrewSchedule v-if="currentAction === 'update'" />
      <FindCrewSchedule v-if="currentAction === 'find'" />
    </div>
  </div>
</template>

<style scoped>
.crew-schedule {
  padding: 1rem;
  height: 100%;
  width: 100%;
  background-color: #f8f9fa;
}

.header {
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
}

.tabs {
  border-bottom: 1px solid #ddd;
  margin: 1rem 0;
}

.tab {
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border: none;
  background: none;
  cursor: pointer;
}

.tab.active {
  border-bottom: 2px solid #563d7c;
  color: #563d7c;
}

.section {
  background-color: #fff;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 4px;
}

.section h3 {
  color: white;
  background-color: #563d7c;
  padding: 0.5rem 1rem;
  margin: -1rem -1rem 1rem -1rem;
  border-radius: 4px 4px 0 0;
}

.sports-list {
  list-style: none;
  padding: 0;
}

.sports-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.add-btn {
  color: blue;
  background: none;
  border: none;
  padding: 0.5rem 0;
  cursor: pointer;
}

.create-btn, .back-btn {
  background-color: #563d7c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.add-sport-form {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.add-sport-form input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.save-btn, .cancel-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn {
  background-color: #563d7c;
  color: white;
}

.cancel-btn {
  background-color: #f0f0f0;
}

.schedule-item {
  cursor: pointer;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.schedule-item:hover {
  background-color: #f5f5f5;
}
</style> 