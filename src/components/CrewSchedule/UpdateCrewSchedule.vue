<template>
  <div class="update-schedule">
    <h2>Update Crew Schedule</h2>
    
    <div class="schedule-selector">
      <label for="scheduleSelect">Select Schedule:</label>
      <select v-model="selectedScheduleId" @change="loadSchedule">
        <option value="">Select a schedule</option>
        <option v-for="schedule in schedules" :key="schedule.id" :value="schedule.id">
          {{ schedule.name }}
        </option>
      </select>
    </div>

    <form v-if="selectedSchedule" @submit.prevent="updateSchedule">
      <div class="form-group">
        <label for="gameStart">Game Start Time:</label>
        <input 
          v-model="selectedSchedule.gameStart" 
          type="datetime-local" 
          id="gameStart" 
          required 
        />
      </div>

      <div class="form-group">
        <label for="venue">Venue:</label>
        <input 
          v-model="selectedSchedule.venue" 
          type="text" 
          id="venue" 
          required 
        />
      </div>

      <div class="form-group">
        <label for="status">Status:</label>
        <select v-model="selectedSchedule.status" id="status">
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="submitted">Submitted</option>
        </select>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-primary">Update Schedule</button>
        <button type="button" class="btn-danger" @click="deleteSchedule">Delete</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const schedules = ref([
  { id: 1, name: 'Football vs. Houston 10/4', status: 'submitted', venue: 'Stadium', gameStart: '2024-10-04T18:30' },
  { id: 2, name: 'Soccer vs. Tech 10/10', status: 'submitted', venue: 'Soccer Field', gameStart: '2024-10-10T19:00' }
])

const selectedScheduleId = ref('')
const selectedSchedule = ref(null)

const loadSchedule = () => {
  const schedule = schedules.value.find(s => s.id === selectedScheduleId.value)
  selectedSchedule.value = schedule ? { ...schedule } : null
}

const updateSchedule = () => {
  console.log('Schedule updated:', selectedSchedule.value)
  // Add your API call here
}

const deleteSchedule = () => {
  if (confirm('Are you sure you want to delete this schedule?')) {
    console.log('Schedule deleted:', selectedScheduleId.value)
    // Add your API call here
  }
}
</script>

<style scoped>
/* Use same styles as AddCrewSchedule with additions: */
.schedule-selector {
  margin-bottom: 2rem;
}

.btn-danger {
  background: #dc3545;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
