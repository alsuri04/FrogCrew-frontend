<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="home">
    <h1>Homepage</h1>
    <div class="tab-container">
      <button 
        class="tab-button active"
      >
        Task List
      </button>
    </div>
    <div class="content">
      <!-- Add your task list content here -->
    </div>
  </div>
</template>

<style scoped>
.home {
  background-color: white;
  border-radius: 4px;
  padding: 1rem;
  height: 100%;
  width: 100%;
}

.tab-container {
  border-bottom: 2px solid #563d7c;
  margin-bottom: 1rem;
}

.tab-button {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
}

.tab-button.active {
  color: #563d7c;
  border-bottom: 2px solid #563d7c;
  margin-bottom: -2px;
}

.content {
  min-height: 400px;
}
</style>
