<template>
  <div>
    <h2>Update Crew Schedule</h2>
    <div v-if="schedule">
      <h3>Game: {{ schedule.gameName }} - {{ schedule.gameDate }}</h3>
      <div class="crew-section">
        <h3>Crew</h3>
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>Report Time</th>
              <th>Report Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(member, index) in schedule.crew" :key="index">
              <td>
                <select v-model="member.position">
                  <option v-for="pos in positions" :key="pos" :value="pos">{{ pos }}</option>
                </select>
              </td>
              <td><input type="text" v-model="member.name"></td>
              <td><input type="time" v-model="member.reportTime"></td>
              <td><input type="text" v-model="member.location"></td>
              <td>
                <button type="button" @click="removeMember(index)" class="remove-btn">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button" @click="addMember" class="add-btn">Add Position</button>
      </div>
      <button type="submit" class="update-btn" @click="updateSchedule">Update Schedule</button>
    </div>
    <div v-else>
      <p>Loading schedule...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Simulated schedule data
const schedule = ref(null)

// Define all positions
const positions = [
  'PRODUCER', 'ASST PROD', 'DIRECTOR', 'ASST DIRECTOR',
  'TECHNICAL DIR', 'GRAPHICS', 'BUG OP', 'REPLAY EVS 1', 'REPLAY EVS 2',
  'VIDEO', 'EIC', '2ND ENG', 'AUDIO 1', 'AUDIO 2',
  'CAMERA 1', 'CAMERA 2 HIGH EZ', 'CAMERA 3 LOW EZ', 'CAMERA 4 N HH',
  'CAMERA 5 S HH', 'CAMERA 6', 'UTILITY', 'UTILITY', 'UTILITY',
  'INTERN', 'OBSERVER', 'OBSERVER'
]

// Fetch the existing schedule
const fetchSchedule = () => {
  const gameId = route.params.gameId
  schedule.value = {
    gameName: `Game ID: ${gameId}`,
    gameDate: '11/16/2024',
    crew: positions.map(pos => ({ position: pos, name: '', reportTime: '', location: '' }))
  }
}

// Function to add a new member
const addMember = () => {
  const newMember = { position: '', name: '', reportTime: '', location: '' }
  schedule.value.crew.push(newMember)
}

// Function to remove a member
const removeMember = (index) => {
  if (schedule.value.crew.length > 1) {
    schedule.value.crew.splice(index, 1)
  }
}

// Function to update the schedule
const updateSchedule = () => {
  console.log('Updated Schedule:', schedule.value)
  // Here you would typically send this data to a backend or further process it
}

// Initialize data on component mount
onMounted(() => {
  fetchSchedule()
})
</script>

<style scoped>
.crew-section {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

th, td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f5f5f5;
}

.add-btn, .remove-btn, .update-btn {
  padding: 5px 10px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn {
  background-color: #28a745;
  color: white;
}

.remove-btn {
  background-color: #dc3545;
  color: white;
}

.update-btn {
  background-color: #007bff;
  color: white;
}

input[type="text"],
input[type="time"],
select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
