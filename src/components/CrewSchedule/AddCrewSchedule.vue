<template>
  <div class="add-schedule">
    <h2>Add Crew Schedule</h2>
    <button @click="goBack" class="back-btn">Back</button>
    <!-- Game Selection -->
    <div class="game-details">
      <h3>Select Game</h3>
      <div class="form-group">
        <label for="gameSelect">Game:</label>
        <select v-model="selectedGameId" @change="updateGameDetails" id="gameSelect" required>
          <option value="" disabled>Select a game</option>
          <option v-for="game in games" :key="game.id" :value="game.id">
            {{ game.name }} - {{ game.date }}
          </option>
        </select>
      </div>
    </div>

    <!-- Crew Table -->
    <div class="crew-section">
      <h3>Crew</h3>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Report Time</th>
            <th>Report Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member, index) in crew" :key="index">
            <td>
              <select v-model="member.position">
                <option v-for="pos in positions" :key="pos" :value="pos">{{ pos }}</option>
              </select>
            </td>
            <td><input type="text" v-model="member.name"></td>
            <td><input type="time" v-model="member.reportTime"></td>
            <td><input type="text" v-model="member.location"></td>
            <td>
              <button type="button" @click="removeMember(index)" class="remove-btn">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" @click="addMember" class="add-btn">Add Position</button>
    </div>

    <button type="submit" class="create-btn" @click="createSchedule">Create Schedule</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Define props
const props = defineProps({
  sportId: {
    type: String,
    required: true
  }
})

// Define reactive variables
const games = ref([])
const selectedGameId = ref('')
const gameName = ref('')
const gameDate = ref('')

// Simulate fetching games from the database
const fetchGames = async () => {
  // Insert API HERE for fetching games
  // Simulated game data
  games.value = [
    { id: '1', name: 'TCU vs SMU', date: '11/16/2024' }
  ]
}

// Update game details based on selection
const updateGameDetails = () => {
  const selectedGame = games.value.find(game => game.id === selectedGameId.value)
  if (selectedGame) {
    gameName.value = selectedGame.name
    gameDate.value = selectedGame.date
  }
}

// Initialize data on component mount
onMounted(() => {
  fetchGames()
})

// Define all positions
const positions = [
  'PRODUCER', 'ASST PROD', 'DIRECTOR', 'ASST DIRECTOR',
  'TECHNICAL DIR', 'GRAPHICS', 'BUG OP', 'REPLAY EVS 1', 'REPLAY EVS 2',
  'VIDEO', 'EIC', '2ND ENG', 'AUDIO 1', 'AUDIO 2',
  'CAMERA 1', 'CAMERA 2 HIGH EZ', 'CAMERA 3 LOW EZ', 'CAMERA 4 N HH',
  'CAMERA 5 S HH', 'CAMERA 6', 'UTILITY', 'UTILITY', 'UTILITY',
  'INTERN', 'OBSERVER', 'OBSERVER'
]

// Initialize crew array with default positions
const crew = ref(positions.map(pos => ({ position: pos, name: '', reportTime: '', location: '' })))

// Function to add a new member
const addMember = () => {
  const newMember = { position: '', name: '', reportTime: '', location: '' }
  crew.value.push(newMember)
  sortCrew()
}

// Function to remove a member
const removeMember = (index) => {
  if (crew.value.length > 1) {
    crew.value.splice(index, 1)
    sortCrew()
  }
}

// Function to sort the crew array
const sortCrew = () => {
  crew.value.sort((a, b) => a.position.localeCompare(b.position))
}

// Function to create a schedule
const createSchedule = () => {
  if (!selectedGameId.value) {
    alert('Please select a game.')
    return
  }

  console.log('Full Schedule:', {
    gameId: props.sportId,
    gameName: gameName.value,
    gameDate: gameDate.value,
    crew: crew.value
  })
}

// Function to go back to the previous page
const goBack = () => {
  router.back()
}
</script>

<style scoped>
.crew-section {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

th, td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f5f5f5;
}

.add-btn, .remove-btn, .back-btn {
  padding: 5px 10px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn {
  background-color: #28a745;
  color: white;
}

.remove-btn {
  background-color: #dc3545;
  color: white;
}

.create-btn {
  display: block;
  width: 200px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-btn {
  background-color: #6c757d;
  color: white;
}

input[type="text"],
input[type="time"],
select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
  