<template>
  <div class="add-schedule">
    <h2>Add Crew Schedule</h2>
    <form @submit.prevent="addCrewSchedule">
      <!-- Game ID Input -->
      <div class="form-group">
        <label for="gameId">Game ID:</label>
        <input 
          v-model="newSchedule.gameId" 
          type="text" 
          id="gameId" 
          required 
        />
      </div>

      <!-- Crew Assignments Section -->
      <div class="crew-assignments">
        <h3>Crew Assignments</h3>
        <!-- Loop through each crew member -->
        <div v-for="(member, index) in newSchedule.changes" :key="index" class="crew-member">
          <!-- User ID Input -->
          <div class="form-group">
            <label :for="'userId' + index">User ID:</label>
            <input 
              v-model="member.userId" 
              type="text" 
              :id="'userId' + index" 
              required 
            />
          </div>

          <!-- Full Name Input -->
          <div class="form-group">
            <label :for="'fullName' + index">Full Name:</label>
            <input 
              v-model="member.fullName" 
              type="text" 
              :id="'fullName' + index" 
              required 
            />
          </div>

          <!-- Position Dropdown -->
          <div class="form-group">
            <label :for="'position' + index">Position:</label>
            <select v-model="member.position" :id="'position' + index" required>
              <option value="">Select Position</option>
              <option v-for="position in CREW_POSITIONS" 
                      :key="position" 
                      :value="position">
                {{ position }}
              </option>
            </select>
          </div>

          <!-- Remove Button (only shown if more than one crew member) -->
          <button 
            type="button" 
            class="btn-danger" 
            @click="removeCrewMember(index)"
            v-if="newSchedule.changes.length > 1"
          >
            Remove
          </button>
        </div>

        <!-- Add New Crew Member Button -->
        <button 
          type="button" 
          class="btn-secondary" 
          @click="addCrewMember"
        >
          Add Crew Member
        </button>
      </div>

      <!-- Form Action Buttons -->
      <div class="form-actions">
        <button type="submit" class="btn-primary">Create Schedule</button>
        <button type="button" class="btn-secondary" @click="resetForm">Reset</button>
      </div>

      <!-- Error Message Display -->
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// Error state for displaying API errors
const error = ref('')

// Initial schedule state
const newSchedule = ref({
  gameId: '',
  changes: [
    {
      action: 'assign', // Default action for crew assignments
      userId: '',
      position: '',
      fullName: ''
    }
  ]
})

// Add a new crew member to the schedule
const addCrewMember = () => {
  newSchedule.value.changes.push({
    action: 'assign',
    userId: '',
    position: '',
    fullName: ''
  })
}

// Remove a crew member from the schedule
const removeCrewMember = (index) => {
  newSchedule.value.changes.splice(index, 1)
}

// Submit the schedule to the API
const addCrewSchedule = async () => {
  try {
    error.value = '' // Clear any existing errors
    const response = await axios.post('/api/CrewSchedule', newSchedule.value)
    
    if (response.data.flag) {
      console.log('Schedule added successfully:', response.data)
      resetForm()
      // emit('scheduleAdded', response.data.data) // Uncomment if using events
    } else {
      error.value = response.data.message
    }
  } catch (err) {
    if (err.response?.data?.data) {
      // Format validation errors
      const validationErrors = Object.values(err.response.data.data).join('\n')
      error.value = validationErrors
    } else {
      error.value = 'Failed to add schedule. Please try again.'
    }
    console.error('Error adding schedule:', err)
  }
}

const resetForm = () => {
  newSchedule.value = {
    gameId: '',
    changes: [
      {
        action: 'assign',
        userId: '',
        position: '',
        fullName: ''
      }
    ]
  }
  error.value = ''
}

// crew positions constant
const CREW_POSITIONS = [
  'PRODUCER',
  'ASSISTANT PRODUCER',
  'DIRECTOR',
  'ASSISTANT DIRECTOR',
  'TECHNICAL DIRECTOR',
  'GRAPHICS OPERATOR',
  'BUG OPERATOR',
  'EVS REPLAY - LEAD',
  'EVS REPLAY - R/O',
  'VIDEO OPERATOR',
  'EIC',
  'ENG 2',
  'AUDIO A1',
  'AUDIO ASSISTANT A2',
  'CAMERA - FIXED',
  'CAMERA - HANDHELD',
  'CAMERA - STEADICAM',
  'UTILITY',
  'TIME OUT COORDINATOR'
]
</script>

<style scoped>
.add-schedule {
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input[type="text"],
input[type="datetime-local"],
input[type="number"],
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.checkbox label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-primary {
  background: #563d7c;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}

.crew-assignments {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.crew-member {
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
  position: relative;
}

.btn-danger {
  background: #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  white-space: pre-line;
}

h3 {
  margin-bottom: 1rem;
}

/* Add some styling for the select dropdown */
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
}

select:focus {
  outline: none;
  border-color: #563d7c;
  box-shadow: 0 0 0 2px rgba(86, 61, 124, 0.2);
}
</style>
  