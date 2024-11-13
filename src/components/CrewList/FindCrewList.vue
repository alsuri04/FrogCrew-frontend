<template>
    <div class="container">
      <h1>Find Crew List</h1>
      <form @submit.prevent="findCrewList" class="search-form">
        <input v-model="searchParams.gameId" placeholder="Game ID" type="text" class="search-input" />
        <button type="submit" class="search-btn">Search</button>
      </form>
  
      <div v-if="crewList === null">
        <h2>No Results Found</h2>
      </div>
      <div v-else-if="crewList.length > 0">
        <h2>Results:</h2>
        <ul class="crew-list">
          <hr>
          <li v-for="crew in crewList" :key="crew.id" class="crew-item">
            <router-link :to="`/viewCrew/${crew.id}`">
              <h3>{{ crew.name }}</h3>
            </router-link>
            <router-link :to="`/editCrew/${crew.id}`">Edit Crew</router-link>
            <div class="crew-details">
              <div class="field">
                <label>Position:</label>
                <span>{{ crew.position }}</span>
              </div>
              <div class="field">
                <label>Experience:</label>
                <span>{{ crew.experience }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <h2>No crew members found for this game. Would you like to add a crew member?</h2>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "CrewListSearch",
    data() {
      return {
        searchParams: {
          gameId: "", // Only gameId is needed for the search
        },
        crewList: null,
      };
    },
    methods: {
      async findCrewList() {
        const URL = `http://localhost:8080/crewList/${this.searchParams.gameId}`;
  
        try {
          const response = await axios.get(URL);
          this.crewList = response.data.data;
          console.log("Crew List found:", this.crewList);
        } catch (err) {
          console.error("Error searching for crew list:", err);
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
  
  .search-form {
    margin-bottom: 20px;
  }
  
  .search-input {
    margin: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .search-btn {
    padding: 8px 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .search-btn:hover {
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
  
  .field {
    margin-bottom: 5px;
  }
  
  .field label {
    font-weight: bold;
  }
  </style>
  