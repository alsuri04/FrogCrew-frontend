<template>
  <div class="find-crew-list">
    <div class="header-container">
      <div class="header-top">
        <h1>Crew Lists</h1>
        <button @click="showAddCrewListModal = true" class="add-btn">Add Crew List</button>
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
      <div v-for="category in sportCategories" :key="category.name" class="sport-category">
        <h2>{{ category.name }}</h2>
        <div class="table-container">
          <table class="sport-table">
            <thead>
              <tr>
                <th>Sport</th>
                <th>Game Count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="sport in filterSports(category.sports)" 
                :key="sport.id"
              >
                <td>{{ sport.name }}</td>
                <td>{{ sport.gameCount }} games</td>
                <td>
                  <button @click="navigateToGames(sport.id)" class="view-btn">View Games</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

// Mock data structure
const sportCategories = ref([
  {
    name: "Men's Sports",
    sports: [
      { id: 1, name: "Men's Football", gameCount: 5 },
      { id: 2, name: "Men's Basketball", gameCount: 3 },
      { id: 3, name: "Men's Baseball", gameCount: 4 }
    ]
  },
  {
    name: "Women's Sports",
    sports: [
      { id: 4, name: "Women's Basketball", gameCount: 4 },
      { id: 5, name: "Women's Soccer", gameCount: 2 },
      { id: 6, name: "Women's Volleyball", gameCount: 3 }
    ]
  }
])

const filterSports = (sports) => {
  if (!searchQuery.value) return sports
  return sports.filter(sport => 
    sport.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
}

const navigateToGames = (sportId) => {
  router.push(`/schedule/crewList/games/${sportId}`)
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
</style>
  