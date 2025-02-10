<!-- List of games in season with option to add availability
 Only for crew member
 -->
<template>
  <div class="games-list">
    <button @click="emitToggleAvailability" class="availability-btn">Availability</button>
    <table>
      <thead>
        <tr>
          <th>Game</th>
          <th>Date</th>
          <th>Location</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in games" :key="game.id">
          <td>{{ game.team }}</td>
          <td>{{ game.date }}</td>
          <td>{{ game.location }}</td>
          <td class="actions">
            <button class="view-btn" @click="navigateToCrewList(game.id)">View Crew List</button>
            <button class="view-btn" @click="navigateToEditCrew(game.id)">Edit Crew</button>
            <div class="availability-controls">
              <input type="checkbox" :id="'availability-' + game.id">
              <input type="text" placeholder="Comment for availability" class="comment-input">
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="add-game-btn">Add New Game</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const games = ref([
  { id: 1, team: 'Texas Tech', date: '2024-10-26', location: 'Carter' },
  { id: 2, team: 'Baylor', date: '2024-11-09', location: 'Carter' },
  { id: 3, team: 'Arizona', date: '2024-11-23', location: 'Carter' },
])

const navigateToCrewList = (gameId) => {
  router.push(`/schedule/crewList/game/${gameId}`)
}

const navigateToEditCrew = (gameId) => {
  router.push(`/schedule/crew/update/${gameId}`)
}
</script>

<style scoped>
.games-list {
  flex: 1;
  overflow-y: auto;
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: white;
}

.actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.view-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.comment-input {
  border: 1px solid #4CAF50;
  padding: 8px;
  border-radius: 4px;
  width: 150px;
}

.availability-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.add-game-btn {
  background-color: #4B0082;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}
</style>
