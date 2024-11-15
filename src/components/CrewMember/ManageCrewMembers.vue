<template>
  <div class="manage-content">
    <div class="search-section">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search crew members..."
        class="search-input"
      />
      <button class="search-button">Search</button>
    </div>

    <div class="table-container">
      <table class="crew-table">
        <thead>
          <tr>
            <th class="checkbox-column"></th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in crewMembers" :key="member.email">
            <td class="checkbox-column">
              <input 
                type="checkbox" 
                v-model="member.selected"
              >
            </td>
            <td>{{ member.name }}</td>
            <td>{{ member.phone }}</td>
            <td>{{ member.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="action-buttons">
      <button class="message-btn">Message</button>
      <button class="delete-btn">Delete Member</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const crewMembers = ref([
  {
    name: 'John Doe',
    phone: '(xxx)-xxx-xxxx',
    email: 'email@tcu.edu',
    selected: false
  },
  {
    name: 'John Doe',
    phone: '(xxx)-xxx-xxxx',
    email: 'email@tcu.edu',
    selected: false
  }
])
</script>

<style scoped>
.manage-content {
  padding: 20px;
}

.search-section {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-button {
  padding: 10px 20px;
  background-color: #999;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.table-container {
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.crew-table {
  width: 100%;
  border-collapse: collapse;
}

.crew-table th,
.crew-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.checkbox-column {
  width: 40px;
  text-align: center;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.message-btn {
  padding: 10px 20px;
  background-color: #999;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn {
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style> 