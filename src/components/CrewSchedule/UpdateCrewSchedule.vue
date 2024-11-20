<template>
  <div class="find-crew-list">
    <div class="header-container">
      <div class="header-top">
        <h1>Crew Schedule</h1>
        <button @click="router.back()" class="back-btn">Back to Games</button>
      </div>
      <div class="action-buttons">
        <button @click="finalizeList" class="finalize-btn">Finalize</button>
        <button @click="submitChanges" class="submit-btn">Save Changes</button>
      </div>
    </div>

    <div class="table-container">
      <table class="crew-table">
        <thead>
          <tr>
            <th>POSITION</th>
            <th>NAME</th>
            <th>REPORT TIME</th>
            <th>REPORT LOCATION</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="crewMember in crewedMembers" :key="crewMember.id">
            <td>
              <select v-model="crewMember.position" class="position-select">
                <option value="">Select Position</option>
                <option v-for="pos in availablePositions" 
                        :key="pos" 
                        :value="pos">
                  {{ pos }}
                </option>
              </select>
              <span class="position-display" v-if="crewMember.position">
                {{ getDisplayTitle(position, index) }}
              </span>
            </td>
            <td>
              <select v-model="crewMember.fullName" class="crew-select">
                <option value="">Select Crew Member</option>
                <option v-for="member in availableCrewMembers" 
                        :key="member" 
                        :value="member">
                  {{ member }}
                </option>
              </select>
            </td>
            <td>
              <input 
                type="text" 
                v-model="position.reportTime"
                class="time-input"
                placeholder="Enter time"
              />
            </td>
            <td>
              <select v-model="position.location" class="location-select">
                <option value="CONTROL ROOM">CONTROL ROOM</option>
                <option value="STADIUM">STADIUM</option>
              </select>
            </td>
            <td>
              <button @click="deletePosition(index)" class="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bottom-button-container">
      <button @click="addNewPosition" class="add-btn">Add New Position</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Available crew members for dropdown
const availableCrewMembers = [
  'MIKE MARTIN',
  'ERICA JOHNSON',
  'LILY BALL',
  'SCOTT SNYDER',
  'KOLBY LEEPER',
  'TIM DALY',
  'GENE ELIZONDO',
  'STEVEN BOCANEGRA',
  'EUGENE WAIRIUKO',
  'TIM SMITH',
  'MARISOL SELA',
  'COREY TOWNSEND',
  'n/r'
]

// Simplify the availablePositions array to base positions
const availablePositions = [
  'PRODUCER',
  'ASST PROD',
  'DIRECTOR',
  'ASST DIRECTOR',
  'TECHNICAL DIR',
  'GRAPHICS',
  'BUG OP',
  'REPLAY EVS',  // Remove numbers from base positions
  'EIC',
  'VIDEO',
  '2ND ENG',
  'AUDIO',      // Base position without number
  'CAMERA',     // Base position without number
  'UTILITY',
  'TECH MANAGER',
  'TOC',
  'OBSERVER'
]

const crewPositions = ref([
  { title: 'PRODUCER', name: 'MIKE MARTIN', reportTime: '5:30PM', location: 'CONTROL ROOM' },
  { title: 'ASST PROD', name: '', reportTime: '', location: 'CONTROL ROOM' },
  { title: 'DIRECTOR', name: 'ERICA JOHNSON', reportTime: '5:30PM', location: 'CONTROL ROOM' },
  { title: 'ASST DIRECTOR', name: '', reportTime: '', location: 'CONTROL ROOM' },
  { title: 'TECHNICAL DIR', name: 'LILY BALL', reportTime: '5:30PM', location: 'CONTROL ROOM' },
  { title: 'GRAPHICS', name: '', reportTime: '', location: 'CONTROL ROOM' },
  { title: 'BUG OP', name: '', reportTime: '', location: 'CONTROL ROOM' },
  { title: 'REPLAY EVS', name: 'SCOTT SNYDER', reportTime: '5:30PM', location: 'CONTROL ROOM' },
  { title: 'REPLAY EVS', name: '', reportTime: '7:30PM', location: 'CONTROL ROOM' },
  { title: 'REPLAY EVS', name: '', reportTime: '', location: 'CONTROL ROOM' },
  { title: 'EIC', name: 'KOLBY LEEPER', reportTime: '5:30PM', location: 'CONTROL ROOM' },
  { title: 'VIDEO', name: 'TIM DALY', reportTime: '5:30PM', location: 'CONTROL ROOM' },
  { title: '2ND ENG', name: '', reportTime: '', location: 'STADIUM' },
  { title: 'AUDIO', name: '', reportTime: '', location: 'STADIUM' },
  { title: 'AUDIO', name: '', reportTime: '', location: 'STADIUM' },
  { title: 'CAMERA', name: 'GENE ELIZONDO', reportTime: '5:30PM', location: 'STADIUM' },
  { title: 'CAMERA', name: 'STEVEN BOCANEGRA', reportTime: '5:30PM', location: 'STADIUM' },
  { title: 'CAMERA', name: '', reportTime: '', location: 'STADIUM' },
  { title: 'CAMERA', name: 'EUGENE WAIRIUKO', reportTime: '5:30PM', location: 'STADIUM' },
  { title: 'CAMERA', name: 'TIM SMITH', reportTime: '5:30PM', location: 'STADIUM' },
  { title: 'CAMERA', name: '', reportTime: '5:30PM', location: 'STADIUM' },
  { title: 'UTILITY', name: 'MARISOL SELA', reportTime: '5:30PM', location: 'STADIUM' },
  { title: 'UTILITY', name: 'COREY TOWNSEND', reportTime: '5:30PM', location: 'STADIUM' },
  { title: 'TECH MANAGER', name: 'n/r', reportTime: '', location: 'STADIUM' },
  { title: 'TOC', name: 'n/r', reportTime: '', location: 'STADIUM' },
  { title: 'OBSERVER', name: '', reportTime: '1HR', location: 'CONTROL ROOM' },
  { title: 'OBSERVER', name: '', reportTime: '1HR', location: 'CONTROL ROOM' }
])

const finalizeList = () => {
  // Here you would implement finalization logic
  console.log('Finalizing crew list:', crewPositions.value)
  alert('Crew list finalized!')
}

const submitChanges = () => {
  // Here you would implement submission logic
  console.log('Submitting changes:', crewPositions.value)
  alert('Changes submitted successfully!')
}

const editPosition = (index) => {
  crewPositions.value[index].isEditing = true
}

const deletePosition = (index) => {
  if (window.confirm('Are you sure you want to delete this position?')) {
    crewPositions.value.splice(index, 1)
  }
}

// Update the getDisplayTitle function to handle numbering
const getDisplayTitle = (position, index) => {
  if (!position.title) return ''
  
  // Get all positions of this type
  const samePositions = crewPositions.value
    .filter(p => p.title.startsWith(position.title))
  
  // If there's only one, return the original title
  if (samePositions.length === 1) {
    return position.title
  }
  
  // Count positions of this type before current index
  const previousPositions = crewPositions.value
    .slice(0, index)
    .filter(p => p.title.startsWith(position.title))
  
  // Add number to positions that have duplicates
  return `${position.title} ${previousPositions.length + 1}`
}

// Modify addNewPosition to handle numbering
const addNewPosition = () => {
  crewPositions.value.push({
    title: '',
    name: '',
    reportTime: '',
    location: 'CONTROL ROOM'
  })
}
</script>

<script>
import axios from 'axios';
export default {
  props: ['gameId'],
  data() {
    return {
      crewedMembers: [],
    }
  },
  created() {
    this.getMembers();
  },
  methods: {
    getMembers() {
      axios.get(`http://localhost:5228/crewSchedule/${this.gameId}`)
        .then(response => {
          this.crewedMembers = response.data.data;
          console.log(this.crewedMembers);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  }
}
</script>

<style scoped>
.find-crew-list {
  padding: 20px;
  color: black;
}

.header-container {
  margin-bottom: 30px;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.action-buttons {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.table-container {
  margin: 20px 0;
  overflow-x: auto;
}

.crew-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  color: black;
}

.crew-table th,
.crew-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid black;
  color: black;
}

.crew-table th {
  background-color: white;
  font-weight: bold;
  color: black;
}

.button-group {
  display: flex;
  gap: 10px;
}

.finalize-btn {
  padding: 8px 16px;
  background-color: #1976D2; /* Blue color for finalize */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.finalize-btn:hover {
  background-color: #1565C0;
}

.submit-btn {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #45a049;
}

.crew-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: Arial, sans-serif;
  background-color: white;
  color: black;
}

.crew-select option {
  color: black;
  background-color: white;
  padding: 8px;
}

/* Add hover effect for dropdown */
.crew-select:hover {
  border-color: #999;
}

/* Style for focused dropdown */
.crew-select:focus {
  outline: none;
  border-color: #4d1979;
  box-shadow: 0 0 3px rgba(77, 25, 121, 0.3);
}

.back-btn {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-btn:hover {
  background-color: #45a049;
}

.time-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: Arial, sans-serif;
  background-color: white;
  color: black;
}

.location-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: Arial, sans-serif;
  background-color: white;
  color: black;
}

.location-select option {
  color: black;
  background-color: white;
  padding: 8px;
}

/* Add hover effect for dropdown */
.location-select:hover {
  border-color: #999;
}

/* Style for focused dropdown */
.location-select:focus {
  outline: none;
  border-color: #4d1979;
  box-shadow: 0 0 3px rgba(77, 25, 121, 0.3);
}

.position-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: Arial, sans-serif;
  background-color: white;
  color: black;
}

.position-select option {
  color: black;
  background-color: white;
  padding: 8px;
}

/* Add hover effect for dropdown */
.position-select:hover {
  border-color: #999;
}

/* Style for focused dropdown */
.position-select:focus {
  outline: none;
  border-color: #4d1979;
  box-shadow: 0 0 3px rgba(77, 25, 121, 0.3);
}

.delete-btn {
  padding: 8px 16px;
  background-color: #d32f2f; /* Red color for delete */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #c62828;
}

.bottom-button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  padding: 0 20px;
}

.add-btn {
  padding: 10px 20px;
  background-color: #4d1979; /* TCU purple */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.add-btn:hover {
  background-color: #3b1259;
}

/* Make sure table cells align properly */
.crew-table td {
  vertical-align: middle;
}

/* Add some spacing in the action column */
.crew-table td:last-child {
  text-align: center;
  min-width: 100px;
}

.position-display {
  margin-left: 5px;
  color: #666;
  font-size: 0.9em;
}
</style> 