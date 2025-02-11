<!-- 
 This is the main page when Schedules tab is clicked, heading is Game Schedule
 Both admin and crew member
 -->
 
<template>
  <div class="find-crew-list">
    <div class="header-container">
      <div class="header-top">
        <h1>Game Schedules</h1>
        <button v-if="isAdmin" @click="showAddCrewListModal = true" class="add-btn">Add Sport</button>
      </div>
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search by game, date, or location..."
          class="search-input"
        />
      </div>
    </div>

    <!-- Sport Categories -->
    <div class="sport-categories">
      <div class="table-container">
        
        <table class="sport-table">
          <thead>
            <tr>
              <th>Sport</th>
              <th hidden >Game Count</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="gameSchedule in gameSchedules" 
              :key="gameSchedule.id"
            >
              <td>{{ gameSchedule.sport }}</td>
              <td hidden >0 games</td>
              <td>
                <RouterLink :to="`/schedule/crewList/games/${gameSchedule.id}`" class="view-btn">View Games</RouterLink>
                <button @click="deleteGameSchedule(gameSchedule.id)" class="delete-btn"hidden>Delete Sport</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <AddGameSchedule 
      v-if="showAddCrewListModal"
      @close="showAddCrewListModal = false, getGameSchedules()"
      @submit="handleAddSport"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AddGameSchedule from '../GameSchedule/AddGameSchedule.vue'

const store = useStore()
const isAdmin = computed(() => store.state.isAdmin)

const router = useRouter()
const searchQuery = ref('')
</script>


<script>
import axios from 'axios';
import { useRouter } from 'vue-router'
export default {
  data() {
    return {
      gameSchedules: [],
      showAddCrewListModal: false,
      GameScheduleDTO: {
        Sport: '',
        Season: '',
      }
    }
  },
  created() {
    this.getGameSchedules()
  },
  methods: {
    getGameSchedules() {
      const season = this.getSchoolYear()
      axios.get(`http://localhost:5228/gameSchedule/season/${season}`)
        .then(response => {
          // Filter out duplicates based on sport name
          this.gameSchedules = this.filterUniqueSports(response.data.data)
          console.log('Game Schedules:', this.gameSchedules)
        })
        .catch(error => {
          console.error('There was an error!', error)
        })
    },
    filterUniqueSports(schedules) {
      // Create a Map to store unique sports using the sport name as the key
      const uniqueSports = new Map()
      
      schedules.forEach(schedule => {
        // Only keep the most recent schedule for each sport
        if (!uniqueSports.has(schedule.sport) || 
            uniqueSports.get(schedule.sport).createdAt < schedule.createdAt) {
          uniqueSports.set(schedule.sport, schedule)
        }
      })
      
      // Convert Map values back to array
      return Array.from(uniqueSports.values())
    },
    getSchoolYear() {
      const today = new Date(); // Get the current date
      const currentYear = today.getFullYear(); // Extract the current year
      const julyFirst = new Date(currentYear, 6, 1); // Create a Date object for July 1st (month is 0-based)

      if (today < julyFirst) {
          // Before July 1st: Previous year - Current year
          return `${currentYear - 1}-${currentYear}`;
      } else {
          // On or after July 1st: Current year - Next year
          return `${currentYear}-${currentYear + 1}`;
      }
    },
    deleteGameSchedule(scheduleId){

    },
    reloadPage() {
      console.log('Reloading page...')
      this.$router.go(0)
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

.search-container {
  margin-bottom: 20px;
}

.search-input {
  width: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.table-container {
  margin: 20px 0;
  overflow-x: auto;
}

.sport-table, .games-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  color: black;
}

.sport-table th,
.sport-table td,
.games-table th,
.games-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.sport-table th,
.games-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.sport-table tr:hover,
.games-table tr:hover {
  background-color: #f9f9f9;
}

.view-btn, .add-btn, .back-btn {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.view-btn:hover, .add-btn:hover, .back-btn:hover {
  background-color: #45a049;
}

.games-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.sport-category {
  margin-bottom: 40px;
}

h1, h2, h3, h4, p {
  color: black;
}

.crew-list-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  padding: 20px;
  z-index: 1000;
  overflow-y: auto;
}

.crew-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
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

.crew-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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

.crew-table td {
  vertical-align: middle;
  color: black;
}

/* Make the crew list screen responsive */
@media (max-width: 768px) {
  .crew-list-screen {
    padding: 10px;
  }

  .crew-select {
    min-width: 150px;
  }
}

/* Add styles for the select options */
.crew-select option {
  color: black;
  background-color: white;
}

.delete-btn {
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
  