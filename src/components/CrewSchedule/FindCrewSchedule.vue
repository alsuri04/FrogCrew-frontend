<template>
  <div class="find-schedule">
    <h2>Find Crew Schedule</h2>
    
    <div class="search-filters">
      <div class="form-group">
        <label for="sportFilter">Sport:</label>
        <select v-model="filters.sportId">
          <option value="">All Sports</option>
          <option v-for="sport in sports" :key="sport.id" :value="sport.id">
            {{ sport.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="dateFilter">Date Range:</label>
        <div class="date-range">
          <input 
            v-model="filters.startDate" 
            type="date" 
            placeholder="Start Date"
          >
          <input 
            v-model="filters.endDate" 
            type="date" 
            placeholder="End Date"
          >
        </div>
      </div>

      <div class="form-group">
        <label for="statusFilter">Status:</label>
        <select v-model="filters.status">
          <option value="">All Statuses</option>
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="submitted">Submitted</option>
        </select>
      </div>

      <button @click="searchSchedules" class="btn-primary">Search</button>
    </div>

    <div class="results" v-if="searchResults.length">
      <h3>Search Results</h3>
      <div class="schedule-card" v-for="schedule in searchResults" :key="schedule.id">
        <h4>{{ schedule.name }}</h4>
        <p>{{ schedule.venue }}</p>
        <p>{{ new Date(schedule.gameStart).toLocaleString() }}</p>
        <span class="status-badge" :class="schedule.status">{{ schedule.status }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sports = ref([
  { id: 1, name: "Men's Football 2024" },
  { id: 2, name: "Women's Soccer 2024" },
  { id: 3, name: "Women's Basketball 2024" },
  { id: 4, name: "Men's Baseball 2024" }
])

const filters = ref({
  sportId: '',
  startDate: '',
  endDate: '',
  status: ''
})

const searchResults = ref([])

const searchSchedules = () => {
  // Simulate API call with sample data
  searchResults.value = [
    {
      id: 1,
      name: 'Football vs. Houston',
      venue: 'Stadium',
      gameStart: '2024-10-04T18:30',
      status: 'submitted'
    },
    // Add more sample results
  ]
}
</script>

<style scoped>
.find-schedule {
  padding: 2rem;
}

.search-filters {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.date-range {
  display: flex;
  gap: 1rem;
}

.date-range input {
  flex: 1;
}

.results {
  margin-top: 2rem;
}

.schedule-card {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: 0.875rem;
  text-transform: capitalize;
}

.status-badge.submitted {
  background: #28a745;
  color: white;
}

.status-badge.in-progress {
  background: #ffc107;
  color: black;
}

.status-badge.not-started {
  background: #dc3545;
  color: white;
}
</style>
