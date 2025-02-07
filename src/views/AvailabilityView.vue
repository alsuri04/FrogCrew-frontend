<template>
  <div class="find-crew-list">
    <div class="header-container">
      <div class="header-top">
        <h1>Games List Availability</h1>
        <button @click="goBackToGamesList" class="back-btn">Back</button>
      </div>
      <div class="availability-button-container">
        <!-- Removed the toggle button as it's no longer needed -->
      </div>
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Search by game, date, or location..."
          class="search-input" />
      </div>
    </div>

    <div class="table-container">
      <table class="sport-table">
        <thead>
          <tr>
            <th>Game</th>
            <th>Date</th>
            <th>Location</th>
            <th v-if="isMobile()">Y/N</th>
            <th v-if="isMobile()">Additional Comments</th>
            <th v-if="!isMobile()">Are You Available?</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(game,index) in FoundGames" :key="game.gameId">
            <td>{{ game.opponent }}</td>
            <td>{{ game.gameDate }}</td>
            <td>{{ game.venue }}</td>
            <td v-if="isMobile()">
              <input type="checkbox" :id=game.id v-model="availabilityList[index].available" class="availability-checkbox" />
            </td>
            <td v-if="isMobile()">
              <input type="text" v-model="availabilityList[index].comments" placeholder="Comment for availability" class="comment-input" />
            </td>
            <td v-if="!isMobile()">
              <div class="button-group" >
                <div class="availability-controls">
                  <input type="checkbox" :id=game.id v-model="availabilityList[index].available" class="availability-checkbox" />
                  <input type="text" v-model="availabilityList[index].comments" placeholder="Comment for availability" class="comment-input" />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Submit Availability Button -->
    <div class="submit-button-container">
      <button @click="submitAvailability" class="submit-btn">
        Submit Availability
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const searchQuery = ref("");
const games = ref([
  { id: 1, name: "Texas Tech", date: "2024-10-26", location: "Carter" },
  { id: 2, name: "Baylor", date: "2024-11-09", location: "Carter" },
  { id: 3, name: "Arizona", date: "2024-11-23", location: "Carter" },
]);

const filteredGames = computed(() => {
  if (!searchQuery.value) return games.value;
  return games.value.filter(
    (game) =>
      game.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      game.date.includes(searchQuery.value) ||
      game.location.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const confirmDeleteGame = (game) => {
  if (window.confirm(`Are you sure you want to delete ${game.name}?`)) {
    games.value = games.value.filter((g) => g.id !== game.id);
  }
};

const scheduleId = route.params.scheduleId || "defaultScheduleId";

const goBackToGamesList = () => {
  router.push(`/schedule/crewList/games/${scheduleId}`);
};
</script>

<script>
import axios from "axios";
import AddAvailability from "@/components/CrewMember/AddAvailability.vue";
export default {
  props: ["scheduleId"],
  data() {
    return {
      FoundGames: [],
      availabilityList: []
    };
  },
  created() {
    this.getGames();
  },
  methods: {
    getGames() {
        console.log("Schedule ID:", this.scheduleId);
        axios
          .get(`http://localhost:5228/gameSchedule/${this.scheduleId}/games`)
          .then((response) => {
            this.FoundGames = response.data.data;
            console.log("Games:", response.data.data);
            this.prepareAvailability();
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
          console.log("before preload")
          
    },
    submitAvailability() {
      console.log(this.availabilityList)

      // Perform the POST request
      axios
        .post(`http://localhost:5228/availability`, this.availabilityList)
        .then((response) => {
          console.log("Availability submitted:", response.data);
          alert("Availability successfully submitted!");
        })
        .catch((error) => {
          console.error("Error submitting availability:", error);
          alert("Failed to submit availability. Please try again.");
        });
    },
    prepareAvailability() {
      this.FoundGames.forEach(game => {
        const AvailabilityDTO = {
          userId: localStorage.getItem("UserId"),
          gameId: game.gameId,
          available: false,
          comments: null
        };
        this.availabilityList.push(AvailabilityDTO);
      });
      console.log("kate")
      console.log(this.availabilityList)
    }
  },
};
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
  margin-bottom: 10px;
}

.search-container {
  margin-bottom: 20px;
}

.search-input {
  width: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.table-container {
  margin: 20px 0;
  overflow-x: auto;
}

.sport-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  color: black;
}

.sport-table th,
.sport-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid black;
  color: black;
}

.sport-table th {
  background-color: white;
  font-weight: bold;
  color: black;
}

.sport-table tr:hover {
  background-color: #f9f9f9;
}

.button-group {
  display: flex;
  gap: 10px;
  align-items: center;
}


.back-btn {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}


.back-btn:hover {
  background-color: #45a049;
}

.availability-checkbox {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.availability-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.comment-input {
  border: 1px solid #4caf50;
  padding: 8px;
  border-radius: 4px;
  width: 250px;
  /* Increased width for longer comment box */
}

.submit-button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #45a049;
}

@media (any-hover: none) {
  .find-crew-list {
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 0px;
  }


}
</style>
