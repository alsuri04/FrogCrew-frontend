<template>
  <div class="add-schedule">
    <h2>Add Crew Schedule</h2>
    
    <!-- Game Details Form -->
    <div class="game-details">
      <h3>Game Information</h3>
      <div class="form-group">
        <label for="gameName">Game Name:</label>
        <input v-model="gameName" type="text" id="gameName" required placeholder="e.g., TCU vs Baylor" />
      </div>
      
      <div class="form-group">
        <label for="gameDate">Game Date:</label>
        <input v-model="gameDate" type="date" id="gameDate" required />
      </div>
    </div>

    <!-- Production Team Table -->
    <div class="crew-section">
      <h3>Production Team</h3>
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
          <tr v-for="(member, index) in productionTeam" :key="index">
            <td>
              <select v-model="member.position">
                <option value="PRODUCER">Producer</option>
                <option value="ASST PROD">Assistant Producer</option>
                <option value="DIRECTOR">Director</option>
                <option value="ASST DIRECTOR">Assistant Director</option>
              </select>
            </td>
            <td><input type="text" v-model="member.name"></td>
            <td><input type="time" v-model="member.reportTime"></td>
            <td><input type="text" v-model="member.location"></td>
            <td>
              <button type="button" @click="removePosition(productionTeam, index)" class="remove-btn">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" @click="addPosition(productionTeam)" class="add-btn">Add Position</button>
    </div>

    <!-- Technical Team Table -->
    <div class="crew-section">
      <h3>Technical Team</h3>
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
          <tr v-for="(member, index) in technicalTeam" :key="index">
            <td>
              <select v-model="member.position">
                <option value="TECHNICAL DIR">Technical Director</option>
                <option value="GRAPHICS">Graphics</option>
                <option value="BUG OP">Bug Operator</option>
                <option value="REPLAY EVS 1">Replay EVS 1</option>
                <option value="REPLAY EVS 2">Replay EVS 2</option>
                <option value="VIDEO">Video</option>
                <option value="EIC">EIC</option>
                <option value="2ND ENG">2nd Engineer</option>
              </select>
            </td>
            <td><input type="text" v-model="member.name"></td>
            <td><input type="time" v-model="member.reportTime"></td>
            <td><input type="text" v-model="member.location"></td>
            <td>
              <button type="button" @click="removePosition(technicalTeam, index)" class="remove-btn">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" @click="addPosition(technicalTeam)" class="add-btn">Add Position</button>
    </div>

    <!-- Audio Team Table -->
    <div class="crew-section">
      <h3>Audio Team</h3>
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
          <tr v-for="(member, index) in audioTeam" :key="index">
            <td>
              <select v-model="member.position">
                <option value="AUDIO 1">Audio 1</option>
                <option value="AUDIO 2">Audio 2</option>
              </select>
            </td>
            <td><input type="text" v-model="member.name"></td>
            <td><input type="time" v-model="member.reportTime"></td>
            <td><input type="text" v-model="member.location"></td>
            <td>
              <button type="button" @click="removePosition(audioTeam, index)" class="remove-btn">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" @click="addPosition(audioTeam)" class="add-btn">Add Position</button>
    </div>

    <!-- Camera Team Table -->
    <div class="crew-section">
      <h3>Camera Team</h3>
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
          <tr v-for="(member, index) in cameraTeam" :key="index">
            <td>
              <select v-model="member.position">
                <option value="CAMERA 1">Camera 1</option>
                <option value="CAMERA 2 HIGH EZ">Camera 2 High EZ</option>
                <option value="CAMERA 3 LOW EZ">Camera 3 Low EZ</option>
                <option value="CAMERA 4 N HH">Camera 4 N HH</option>
                <option value="CAMERA 5 S HH">Camera 5 S HH</option>
                <option value="CAMERA 6">Camera 6</option>
              </select>
            </td>
            <td><input type="text" v-model="member.name"></td>
            <td><input type="time" v-model="member.reportTime"></td>
            <td><input type="text" v-model="member.location"></td>
            <td>
              <button type="button" @click="removePosition(cameraTeam, index)" class="remove-btn">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" @click="addPosition(cameraTeam)" class="add-btn">Add Position</button>
    </div>

    <button type="submit" class="create-btn" @click="createSchedule">Create Schedule</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  sportId: {
    type: String,
    required: true
  }
})

const gameName = ref('')
const gameDate = ref('')

// Initialize team arrays with default positions
const productionTeam = ref([
  { position: 'PRODUCER', name: '', reportTime: '', location: '' },
  { position: 'DIRECTOR', name: '', reportTime: '', location: '' }
])

const technicalTeam = ref([
  { position: 'TECHNICAL DIR', name: '', reportTime: '', location: '' },
  { position: 'GRAPHICS', name: '', reportTime: '', location: '' }
])

const audioTeam = ref([
  { position: 'AUDIO 1', name: '', reportTime: '', location: '' },
  { position: 'AUDIO 2', name: '', reportTime: '', location: '' }
])

const cameraTeam = ref([
  { position: 'CAMERA 1', name: '', reportTime: '', location: '' },
  { position: 'CAMERA 2 HIGH EZ', name: '', reportTime: '', location: '' }
])

// Functions to manage positions
const addPosition = (team) => {
  team.value.push({ position: '', name: '', reportTime: '', location: '' })
}

const removePosition = (team, index) => {
  if (team.value.length > 1) {
    team.value.splice(index, 1)
  }
}

const createSchedule = () => {
  // Combine all teams into one schedule
  const fullSchedule = [
    ...productionTeam.value,
    ...technicalTeam.value,
    ...audioTeam.value,
    ...cameraTeam.value
  ]
  
  console.log('Full Schedule:', { gameId: props.sportId, crew: fullSchedule })
  //
}
</script>

<style scoped>
/* Add your existing styles and these new ones */
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

.add-btn, .remove-btn {
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

input[type="text"],
input[type="time"],
select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
  