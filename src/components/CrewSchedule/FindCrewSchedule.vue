<template>
  <div class="find-crew-schedule">
    <div class="header-container">
      <div class="header-top">
        <h1>Crew Schedules</h1>
        <button @click="showAddScheduleModal = true" class="add-btn">Add Crew Schedule</button>
      </div>
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search by game, date, or crew member..."
          class="search-input"
        />
      </div>
    </div>

    <!-- Sport Categories -->
    <div class="sport-categories">
      <div v-for="category in sportCategories" :key="category.name" class="sport-category">
        <h2>{{ category.name }}</h2>
        <div class="sport-list">
          <div 
            v-for="sport in filterSports(category.sports)" 
            :key="sport.id" 
            class="sport-folder"
            @click="selectSportFolder(sport)"
          >
            <span class="sport-icon">📁</span>
            {{ sport.name }}
            <span class="game-count">({{ sport.gameCount }} games)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Games List (shown when a sport is selected) -->
    <div v-if="selectedSport" class="games-list">
      <div class="games-header">
        <h3>{{ selectedSport.name }} Games</h3>
        <button @click="selectedSport = null" class="back-btn">Back to Sports</button>
      </div>
      <div class="games-grid">
        <div v-for="game in filteredGames" :key="game.id" class="game-card" @click="viewSchedule(game)">
          <h4>{{ game.name }}</h4>
          <p>Date: {{ formatDate(game.date) }}</p>
          <p>Crew Count: {{ game.crewCount }}</p>
        </div>
      </div>
    </div>

    <!-- Add Schedule Modal -->
    <div v-if="showAddScheduleModal" class="modal">
      <div class="modal-content">
        <h2>Create Schedule: Select Sport</h2>
        <div class="sport-selection">
          <div v-for="category in sportCategories" :key="category.name">
            <h3>{{ category.name }}</h3>
            <div class="sport-grid">
              <div 
                v-for="sport in category.sports" 
                :key="sport.id" 
                class="sport-item"
                @click="selectSportForNewSchedule(sport)"
              >
                {{ sport.name }}
              </div>
            </div>
          </div>
          <div class="sport-item add-new" @click="showAddSportForm = true">
            + Add New Sport
          </div>
        </div>
        
        <!-- Add New Sport Form -->
        <div v-if="showAddSportForm" class="add-sport-form">
          <select v-model="newSportCategory" class="category-select">
            <option value="Men's">Men's</option>
            <option value="Women's">Women's</option>
          </select>
          <input v-model="newSportName" placeholder="Enter sport name" />
          <button @click="addNewSport">Add Sport</button>
          <button @click="showAddSportForm = false">Cancel</button>
        </div>

        <button @click="showAddScheduleModal = false" class="close-btn">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const showAddScheduleModal = ref(false)
const showAddSportForm = ref(false)
const newSportName = ref('')
const newSportCategory = ref("Men's")
const selectedSport = ref(null)

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

// Mock games data
const games = ref([
  { 
    id: 1, 
    sportId: 1,
    name: 'TCU vs Baylor',
    date: '2024-03-15',
    crewCount: 25
  },
  // Add more games...
])

const filteredGames = computed(() => {
  if (!selectedSport.value) return []
  
  return games.value
    .filter(game => game.sportId === selectedSport.value.id)
    .filter(game => {
      if (!searchQuery.value) return true
      return game.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
             game.date.includes(searchQuery.value)
    })
})

const filterSports = (sports) => {
  if (!searchQuery.value) return sports
  return sports.filter(sport => 
    sport.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
}

const selectSportFolder = (sport) => {
  selectedSport.value = sport
}

const selectSportForNewSchedule = (sport) => {
  showAddScheduleModal.value = false
  router.push({
    name: 'addCrewSchedule',
    params: { sportId: sport.id }
  })
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const addNewSport = () => {
  if (newSportName.value) {
    const category = sportCategories.value.find(c => c.name === `${newSportCategory.value} Sports`)
    if (category) {
      category.sports.push({
        id: Date.now(), // temporary ID generation
        name: `${newSportCategory.value} ${newSportName.value}`,
        gameCount: 0
      })
    }
    newSportName.value = ''
    showAddSportForm.value = false
  }
}

const viewSchedule = (game) => {
  router.push(`/schedule/crew/${game.id}`)
}
</script>

<style scoped>
.find-crew-schedule {
  padding: 20px;
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
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.search-input:focus {
  outline: none;
  border-color: #563d7c;
  box-shadow: 0 2px 4px rgba(86,61,124,0.1);
}

.add-btn {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.add-btn:hover {
  background-color: #218838;
}

.schedules-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.schedule-card {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.schedule-card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 400px;
}

.sport-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin: 20px 0;
}

.sport-item {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
}

.sport-item:hover {
  background-color: #f5f5f5;
}

.add-new {
  border-style: dashed;
  color: #666;
}

.add-sport-form {
  margin-top: 20px;
  padding: 15px;
  border-top: 1px solid #ddd;
}

.add-sport-form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

.close-btn {
  margin-top: 15px;
  padding: 8px 15px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.sport-categories {
  margin-top: 20px;
}

.sport-category {
  margin-bottom: 30px;
}

.sport-folder {
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.sport-folder:hover {
  background-color: #f5f5f5;
}

.sport-icon {
  margin-right: 10px;
}

.game-count {
  margin-left: auto;
  color: #666;
}

.games-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.game-card {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
}

.game-card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.category-select {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
