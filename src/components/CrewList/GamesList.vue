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
              <div class="button-group">
                <button @click="navigateToCrewList(game.id)" class="view-btn">View Crew List</button>
                <button @click="navigateToEditCrew(game.id)" class="view-btn">Edit Crew</button>
                <button @click="confirmDeleteGame(game)" class="delete-btn" hidden>Delete Game</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bottom-button-container">
      <button @click="showAddGameModal = true" class="add-btn">Add New Game</button>
    </div>

    <AddGamesToSchedule
      :showModal="showAddGameModal"
      @close="showAddGameModal = false"
      @submit="handleAddGame"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AddGamesToSchedule from '../GameSchedule/AddGamesToSchedule.vue'

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

const navigateToEditCrew = (gameId) => {
  router.push(`/schedule/crew/update/${gameId}`)
}

const showAddGameModal = ref(false)

const handleAddGame = (newGame) => {
  // Generate a new ID for the game
  const newId = Math.max(...games.value.map(g => g.id)) + 1
  
  // Add the new game to the games array
  games.value.push({
    id: newId,
    ...newGame
  })
}

const confirmDeleteGame = (game) => {
  if (window.confirm(`Are you sure you want to delete ${game.name}?`)) {
    // Remove the game from the games array
    games.value = games.value.filter(g => g.id !== game.id)
  }
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

.button-group {
  display: flex;
  gap: 10px;
  align-items: center;
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

.delete-btn {
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style> 