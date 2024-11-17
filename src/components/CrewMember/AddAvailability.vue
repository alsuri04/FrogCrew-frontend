<template>
  <div class="availability-container">
    <h1>Set Your Availability</h1>
    <div class="availability-form">
      <label for="sportSelect">Select Sport:</label>
      <select v-model="selectedSport" id="sportSelect">
        <option v-for="sport in sports" :key="sport.id" :value="sport.name">
          {{ sport.name }}
        </option>
      </select>

      <div class="dates">
        <div v-for="date in availableDates" :key="date" class="date-card">
          <h3>{{ formatDate(date) }}</h3>
          <button @click="toggleAvailability(date, true)" :class="{ active: isAvailable(date) }">Yes</button>
          <button @click="toggleAvailability(date, false)" :class="{ active: !isAvailable(date) }">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sports = ref([
  { id: 1, name: "Women's Soccer" },
  { id: 2, name: "Men's Basketball" }
])

const selectedSport = ref(sports.value[0].name)
const availableDates = ref(['2024-10-15', '2024-10-28', '2024-11-21'])
const availability = ref({})

const toggleAvailability = (date, isAvailable) => {
  availability.value[date] = isAvailable
}

const isAvailable = (date) => {
  return availability.value[date] === true
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
</script>

<style scoped>
.availability-container {
  padding: 20px;
}

.availability-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dates {
  display: flex;
  gap: 20px;
}

.date-card {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.active {
  background-color: #28a745;
  color: white;
}

button:not(.active) {
  background-color: #dc3545;
  color: white;
}
</style>
