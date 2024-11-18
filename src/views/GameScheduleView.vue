<template>
  <div class="schedule-container">
    <h1 class="page-title">Game Schedules</h1>
    
    <div class="tab-container">
      <div class="tab active">Events</div>
      <div class="tab">Crew</div>
    </div>

    <div class="content-section">
      <div class="schedule-header">
        <h2>Create Schedule: Select Sport</h2>
      </div>

      <div class="sports-list">
        <div 
          v-for="sport in sports" 
          :key="sport.id" 
          class="sport-item"
          @click="handleSportClick(sport)"
        >
          {{ sport.name }}
        </div>
        <div class="sport-item add-new">Add New</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sports = ref([
  { id: 1, name: "Men's Football 2024" },
  { id: 2, name: "Women's Soccer 2024" },
  { id: 3, name: "Women's Basketball 2024" },
  { id: 4, name: "Men's Baseball 2024" }
])

const fetchSports = async () => {
  try {
    const response = await axios.get('/api/gameSchedule')
    sports.value = response.data
  } catch (error) {
    console.error('Error fetching sports:', error)
  }
}

const handleSportClick = async (sport) => {
  try {
    // Handle sport selection - you can add API call here if needed
    console.log('Selected sport:', sport)
  } catch (error) {
    console.error('Error selecting sport:', error)
  }
}

onMounted(() => {
  fetchSports()
})
</script>

<style scoped>
.schedule-container {
  background-color: white;
  min-height: 100vh;
  padding: 20px;
}

.page-title {
  font-size: 24px;
  color: #333;
  margin: 0 0 20px 0;
}

.tab-container {
  display: flex;
  gap: 20px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  color: #666;
}

.tab.active {
  color: #4d1979;
  font-weight: bold;
  border-bottom: 2px solid #4d1979;
}

.schedule-header {
  background-color: #4d1979;
  color: white;
  padding: 15px 20px;
  margin-bottom: 20px;
  border-radius: 4px;
}

.schedule-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: normal;
}

.sports-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sport-item {
  background-color: white;
  padding: 15px 20px;
  border-radius: 4px;
  cursor: pointer;
  color: #4d1979;
  transition: background-color 0.2s;
  border: 1px solid #e0e0e0;
}

.sport-item:hover {
  background-color: #f5f5f5;
}

.sport-item:nth-child(odd) {
  background-color: #f5f5f5;
}

.sport-item:nth-child(even) {
  background-color: white;
}

.add-new {
  border: 2px dashed #4d1979;
  text-align: center;
  background-color: transparent;
}
</style> 