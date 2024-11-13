<template>
    <div class="container">
      <h1>Update Crew List</h1>
      <form @submit.prevent="updateCrewList" class="update-form">
        <input v-model="searchParams.gameId" placeholder="Game ID" type="text" class="search-input" />
        <button @click="fetchCrewList" type="button" class="search-btn">Load Crew List</button>
      </form>
  
      <div v-if="crewList === null">
        <h2>No Crew Members Found</h2>
      </div>
      <div v-else-if="crewList.length > 0">
        <h2>Edit Crew Details:</h2>
        <ul class="crew-list">
          <hr />
          <li v-for="(crew, index) in crewList" :key="crew.id" class="crew-item">
            <h3>Edit {{ crew.name }}</h3>
            <div class="crew-details">
              <div class="field">
                <label>Name:</label>
                <input v-model="crew.name" type="text" class="crew-input" />
              </div>
              <div class="field">
                <label>Position:</label>
                <input v-model="crew.position" type="text" class="crew-input" />
              </div>
              <div class="field">
                <label>Experience:</label>
                <input v-model="crew.experience" type="text" class="crew-input" />
              </div>
            </div>
          </li>
        </ul>
        <button type="submit" class="update-btn">Save Changes</button>
      </div>
      <div v-else>
        <h2>No crew list loaded. Enter a Game ID to load crew members.</h2>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "UpdateCrewList",
    data() {
      return {
        searchParams: {
          gameId: "",
        },
        crewList: null,
      };
    },
    methods: {
      async fetchCrewList() {
        const URL = `http://localhost:8080/crewList/${this.searchParams.gameId}`;
  
        try {
          const response = await axios.get(URL);
          this.crewList = response.data.data;
          console.log("Crew List loaded:", this.crewList);
        } catch (err) {
          console.error("Error loading crew list:", err);
        }
      },
      async updateCrewList() {
        const URL = `http://localhost:8080/updateCrewList/${this.searchParams.gameId}`;
        
        try {
          const response = await axios.put(URL, { crewList: this.crewList });
          console.log("Crew List updated:", response.data);
          alert("Crew list updated successfully!");
        } catch (err) {
          console.error("Error updating crew list:", err);
          alert("Failed to update crew list.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    flex-direction: column;
  }
  
  .update-form {
    margin-bottom: 20px;
  }
  
  .search-input {
    margin: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .search-btn,
  .update-btn {
    padding: 8px 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .search-btn:hover,
  .update-btn:hover {
    background-color: #0056b3;
  }
  
  .crew-list {
    list-style-type: none;
    padding: 0;
  }
  
  .crew-item {
    margin-bottom: 20px;
  }
  
  .crew-details {
    margin-left: 20px;
  }
  
  .crew-input {
    margin-top: 5px;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .field label {
    font-weight: bold;
  }
  </style>
  