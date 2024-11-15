<template>
    <div class="find-games">
      <h2>Find Games</h2>
  
      <!-- Search by Schedule ID -->
      <div class="search-section">
        <h3>Find Games by Schedule ID</h3>
        <div class="form-group">
          <label for="scheduleId">Schedule ID:</label>
          <input v-model="scheduleId" type="text" id="scheduleId" placeholder="Enter Schedule ID" />
        </div>
        <button @click="findGamesByScheduleId" class="search-btn">Search by Schedule ID</button>
      </div>
  
      <!-- Search by Game ID -->
      <div class="search-section">
        <h3>Find Game by Game ID</h3>
        <div class="form-group">
          <label for="gameId">Game ID:</label>
          <input v-model="gameId" type="text" id="gameId" placeholder="Enter Game ID" />
        </div>
        <button @click="findGameByGameId" class="search-btn">Search by Game ID</button>
      </div>
  
      <!-- Display Search Results -->
      <div v-if="searchResults.length > 0" class="results-section">
        <h3>Search Results</h3>
        <table>
          <thead>
            <tr>
              <th>Game ID</th>
              <th>Schedule ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Sport</th>
              <th>Opponent</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in searchResults" :key="index">
              <td>{{ game.gameId }}</td>
              <td>{{ game.scheduleId }}</td>
              <td>{{ game.date }}</td>
              <td>{{ game.time }}</td>
              <td>{{ game.sport }}</td>
              <td>{{ game.opponent }}</td>
              <td>{{ game.notes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div v-else-if="searchPerformed" class="no-results">
        <p>No results found.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const scheduleId = ref('');
      const gameId = ref('');
      const searchResults = ref([]);
      const searchPerformed = ref(false);
  
      const findGamesByScheduleId = async () => {
        searchPerformed.value = false;
        searchResults.value = [];
  
        if (!scheduleId.value) {
          alert('Please enter a Schedule ID.');
          return;
        }
  
        // Simulated fetch - Replace with actual API call
        const results = await fetchGamesByScheduleId(scheduleId.value);
        searchResults.value = results;
        searchPerformed.value = true;
      };
  
      const findGameByGameId = async () => {
        searchPerformed.value = false;
        searchResults.value = [];
  
        if (!gameId.value) {
          alert('Please enter a Game ID.');
          return;
        }
  
        // Simulated fetch - Replace with actual API call
        const result = await fetchGameByGameId(gameId.value);
        searchResults.value = result ? [result] : [];
        searchPerformed.value = true;
      };
  
      // Simulated API calls - replace these with actual API calls
      const fetchGamesByScheduleId = async (scheduleId) => {
        // Replace this with actual API call to fetch games by schedule ID
        return [
          {
            gameId: '123',
            scheduleId: scheduleId,
            date: '10/10/2024',
            time: '3:00 PM',
            sport: "Women's Basketball",
            opponent: 'UCF',
            notes: ''
          },
          {
            gameId: '124',
            scheduleId: scheduleId,
            date: '10/13/2024',
            time: '3:00 PM',
            sport: "Women's Basketball",
            opponent: 'Texas Tech',
            notes: ''
          }
        ];
      };
  
      const fetchGameByGameId = async (gameId) => {
        // Replace this with actual API call to fetch a game by game ID
        if (gameId === '123') {
          return {
            gameId: '123',
            scheduleId: '456',
            date: '10/10/2024',
            time: '3:00 PM',
            sport: "Women's Basketball",
            opponent: 'UCF',
            notes: ''
          };
        }
        return null; // Return null if not found
      };
  
      return {
        scheduleId,
        gameId,
        searchResults,
        searchPerformed,
        findGamesByScheduleId,
        findGameByGameId
      };
    }
  };
  </script>
  
  <style scoped>
  .find-games {
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
  
  .search-section {
    margin-bottom: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .search-btn {
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
  
  .search-btn:hover {
    background-color: #4a2c80;
  }
  
  .results-section {
    margin-top: 1.5rem;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  
  th, td {
    padding: 0.75rem;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  th {
    background-color: #f5f5f5;
  }
  
  .no-results {
    text-align: center;
    color: #999;
    font-style: italic;
    margin-top: 1rem;
  }
  </style>
  