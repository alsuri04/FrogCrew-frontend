<template>
  <div class="add-games-schedule">
    <h2>Add Games to Schedule</h2>

    <!-- Form to add a new game event -->
    <div class="game-event-form">
      <h3>Game Information</h3>
      <div class="form-group">
        <label for="dayOfWeek">Day of Week:</label>
        <input v-model="dayOfWeek" type="text" id="dayOfWeek" required placeholder="e.g., SUN" />
      </div>

      <div class="form-group">
        <label for="gameDate">Date:</label>
        <input v-model="gameDate" type="date" id="gameDate" required />
      </div>

      <div class="form-group">
        <label for="gameTime">Time:</label>
        <input v-model="gameTime" type="time" id="gameTime" required />
      </div>

      <div class="form-group">
        <label for="sport">Sport:</label>
        <input v-model="sport" type="text" id="sport" required placeholder="e.g., Women's Basketball" />
      </div>

      <div class="form-group">
        <label for="opponent">Opponent:</label>
        <input v-model="opponent" type="text" id="opponent" required placeholder="e.g., Texas Tech" />
      </div>

      <div class="form-group">
        <label for="notes">Notes:</label>
        <input v-model="notes" type="text" id="notes" placeholder="Additional notes" />
      </div>

      <button @click="addGameEvent" class="add-game-btn">Add Game</button>
    </div>

    <!-- Table displaying the added games -->
    <div class="game-events-table">
      <h3>Schedule</h3>
      <table>
        <thead>
          <tr>
            <th>Day of Week</th>
            <th>Date</th>
            <th>Time</th>
            <th>Sport</th>
            <th>Opponent</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(game, index) in gameEvents" :key="index">
            <td>{{ game.dayOfWeek }}</td>
            <td>{{ game.gameDate }}</td>
            <td>{{ game.gameTime }}</td>
            <td>{{ game.sport }}</td>
            <td>{{ game.opponent }}</td>
            <td>{{ game.notes }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <button @click="submitSchedule" class="submit-btn">Submit</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const dayOfWeek = ref('');
    const gameDate = ref('');
    const gameTime = ref('');
    const sport = ref('');
    const opponent = ref('');
    const notes = ref('');
    const gameEvents = ref([]);

    const addGameEvent = () => {
      if (!dayOfWeek.value || !gameDate.value || !gameTime.value || !sport.value || !opponent.value) {
        alert('Please fill out all required fields.');
        return;
      }

      // Add the new game event to the gameEvents array
      gameEvents.value.push({
        dayOfWeek: dayOfWeek.value,
        gameDate: gameDate.value,
        gameTime: gameTime.value,
        sport: sport.value,
        opponent: opponent.value,
        notes: notes.value
      });

      // Clear the form fields
      dayOfWeek.value = '';
      gameDate.value = '';
      gameTime.value = '';
      sport.value = '';
      opponent.value = '';
      notes.value = '';
    };

    const submitSchedule = () => {
      console.log('Submitted Schedule:', gameEvents.value);
      alert('Schedule submitted successfully!');
      // Here you would typically send gameEvents to your backend

      // Clear the schedule after submission
      gameEvents.value = [];
    };

    return {
      dayOfWeek,
      gameDate,
      gameTime,
      sport,
      opponent,
      notes,
      gameEvents,
      addGameEvent,
      submitSchedule
    };
  }
};
</script>

<style scoped>
.add-games-schedule {
  padding: 1.5rem;
  max-width: 800px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
}

h2, h3 {
  color: #5d3aa3;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="date"],
input[type="time"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-game-btn, .submit-btn {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: #5d3aa3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}

.add-game-btn:hover, .submit-btn:hover {
  background-color: #4a2c80;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
}

th, td {
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f5f5f5;
}
</style>


