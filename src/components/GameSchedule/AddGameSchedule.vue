<template>
  <div class="add-sport-schedule">
    <h2>Create Schedule: Enter Sport</h2>
   
    <!-- Sport Name Input -->
    <div class="form-group">
      <label for="sportName">Sport Name:</label>
      <input v-model="sportName" type="text" id="sportName" required placeholder="e.g., Men's Football 2024" />
    </div>

    <!-- Game Details Form -->
    <div v-if="sportName" class="game-schedule-form">
      <h3>Game Schedule for {{ sportName }}</h3>

      <div class="form-group">
        <label for="gameName">Game Name:</label>
        <input v-model="gameName" type="text" id="gameName" required placeholder="e.g., TCU vs Baylor" />
      </div>
     
      <div class="form-group">
        <label for="gameDate">Game Date:</label>
        <input v-model="gameDate" type="date" id="gameDate" required />
      </div>

      <div class="form-group">
        <label for="gameTime">Game Time:</label>
        <input v-model="gameTime" type="time" id="gameTime" required />
      </div>

      <button @click="addGame" class="add-game-btn">Add Game</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const sportName = ref('');
    const gameName = ref('');
    const gameDate = ref('');
    const gameTime = ref('');

    const addGame = () => {
      if (!sportName.value || !gameName.value || !gameDate.value || !gameTime.value) {
        alert('Please fill out all fields.');
        return;
      }
     
      const newGame = {
        sport: sportName.value,
        gameName: gameName.value,
        gameDate: gameDate.value,
        gameTime: gameTime.value
      };
     
      console.log('Game Added:', newGame);
      // Here, you would typically send newGame to the backend or handle it as needed
      alert(`Game successfully added for ${sportName.value}`);

      // Clear fields after adding game
      sportName.value = '';
      gameName.value = '';
      gameDate.value = '';
      gameTime.value = '';
    };

    return {
      sportName,
      gameName,
      gameDate,
      gameTime,
      addGame
    };
  }
};
</script>

<style scoped>
.add-sport-schedule {
  padding: 1.5rem;
  max-width: 600px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
}

h2 {
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

.add-game-btn {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: #5d3aa3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.add-game-btn:hover {
  background-color: #4a2c80;
}
</style>


