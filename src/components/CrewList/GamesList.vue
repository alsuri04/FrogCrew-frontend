<template>
  <div class="find-crew-list">
    <div class="header-container">
      <div class="header-top">
        <h1>Games List</h1>
        <button @click="router.push('/schedule/crewList')" class="back-btn">Back to Sports</button>
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

    <div class="table-container">
      <table class="sport-table">
        <thead>
          <tr>
            <th>Game</th>
            <th>Date</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="game in filteredGames" :key="game.id">
            <td>{{ game.name }}</td>
            <td>{{ formatDate(game.date) }}</td>
            <td>{{ game.location }}</td>
            <td>
              <button @click="navigateToCrewList(game.id)" class="view-btn">View Crew List</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const searchQuery = ref('')

// Mock games data
const games = ref([
  { 
    id: 1, 
    sportId: 1,
    name: "TCU vs Baylor",
    date: "2024-11-15",
    location: "Amon G. Carter Stadium"
  },
  { 
    id: 2, 
    sportId: 1,
    name: "TCU vs Texas",
    date: "2024-11-22",
    location: "Amon G. Carter Stadium"
  },
  // Add more games as needed
])

const filteredGames = computed(() => {
  const filtered = games.value.filter(game => game.sportId === parseInt(route.params.sportId))
  if (!searchQuery.value) return filtered
  
  return filtered.filter(game => 
    game.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    game.date.includes(searchQuery.value) ||
    game.location.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const navigateToCrewList = (gameId) => {
  router.push(`/schedule/crewList/game/${gameId}`)
}
</script>

<style scoped>
/* Copy all styles from FindCrewList.vue */
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

.sport-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  color: black;
}

.sport-table th,
.sport-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid black;
  color: black;
}

.sport-table th {
  background-color: white;
  font-weight: bold;
  color: black;
}

.sport-table tr:hover {
  background-color: #f9f9f9;
}

.view-btn, .back-btn {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.view-btn:hover, .back-btn:hover {
  background-color: #45a049;
}
</style> 