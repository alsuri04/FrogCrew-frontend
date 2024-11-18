<template>
  <div class="find-crew-list">
    <div class="header-container">
      <div class="header-top">
        <h1>Crew List</h1>
        <button @click="router.back()" class="back-btn">Back to Games</button>
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="position in crewPositions" :key="position.title">
            <td>{{ position.title }}</td>
            <td>{{ position.name || '-' }}</td>
            <td>{{ position.reportTime || '-' }}</td>
            <td>{{ position.location }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const crewPositions = ref([
  { title: 'PRODUCER', name: 'MIKE MARTIN', reportTime: '5:30PM', location: 'CONTROL ROOM' },
  { title: 'ASST PROD', name: '', reportTime: '', location: 'CONTROL ROOM' },
  { title: 'DIRECTOR', name: 'ERICA JOHNSON', reportTime: '5:30PM', location: 'CONTROL ROOM' },
  { title: 'ASST DIRECTOR', name: '', reportTime: '', location: 'CONTROL ROOM' },
  { title: 'TECHNICAL DIR', name: 'LILY BALL', reportTime: '5:30PM', location: 'CONTROL ROOM' },
  { title: 'GRAPHICS', name: '', reportTime: '', location: 'CONTROL ROOM' },
  { title: 'BUG OP', name: '', reportTime: '', location: 'CONTROL ROOM' },
  { title: 'REPLAY EVS 1', name: 'SCOTT SNYDER', reportTime: '5:30PM', location: 'CONTROL ROOM' },
  { title: 'REPLAY EVS 2', name: '', reportTime: '7:30PM', location: 'CONTROL ROOM' },
  { title: 'REPLAY EVS 3', name: '', reportTime: '', location: 'CONTROL ROOM' },
  { title: 'EIC', name: 'KOLBY LEEPER', reportTime: '5:30PM', location: 'CONTROL ROOM' },
  { title: 'VIDEO', name: 'TIM DALY', reportTime: '5:30PM', location: 'CONTROL ROOM' },
  { title: '2ND ENG', name: '', reportTime: '', location: 'STADIUM' },
  { title: 'AUDIO 1', name: '', reportTime: '', location: 'STADIUM' },
  { title: 'AUDIO 2', name: '', reportTime: '', location: 'STADIUM' },
  { title: 'CAMERA 1', name: 'GENE ELIZONDO', reportTime: '5:30PM', location: 'STADIUM' },
  { title: 'CAMERA 2', name: 'STEVEN BOCANEGRA', reportTime: '5:30PM', location: 'STADIUM' },
  { title: 'CAMERA 3', name: '', reportTime: '', location: 'STADIUM' },
  { title: 'CAMERA 4', name: 'EUGENE WAIRIUKO', reportTime: '5:30PM', location: 'STADIUM' },
  { title: 'CAMERA 5', name: 'TIM SMITH', reportTime: '5:30PM', location: 'STADIUM' },
  { title: 'CAMERA 6', name: '', reportTime: '5:30PM', location: 'STADIUM' },
  { title: 'UTILITY', name: 'MARISOL SELA', reportTime: '5:30PM', location: 'STADIUM' },
  { title: 'UTILITY', name: 'COREY TOWNSEND', reportTime: '5:30PM', location: 'STADIUM' },
  { title: 'TECH MANAGER', name: 'n/r', reportTime: '', location: 'STADIUM' },
  { title: 'TOC', name: 'n/r', reportTime: '', location: 'STADIUM' },
  { title: 'OBSERVER', name: '', reportTime: '1HR', location: 'CONTROL ROOM' },
  { title: 'OBSERVER', name: '', reportTime: '1HR', location: 'CONTROL ROOM' }
])
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

.button-group {
  display: flex;
  gap: 10px;
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

.download-btn {
  padding: 8px 16px;
  background-color: #1976D2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.download-btn:hover {
  background-color: #1565C0;
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

/* Make the table read-only looking */
.crew-table td {
  background-color: #f8f9fa;
}
</style> 