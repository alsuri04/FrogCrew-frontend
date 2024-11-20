<template>
  <div class="crew-member-container">
    <div class="header-box">
      <h1>Crew Members</h1>
      <div class="tab-container">
        <button 
          class="tab-button" 
          :class="{ active: activeTab === 'manage' }"
          @click="activeTab = 'manage'"
        >
          Manage
        </button>
        <button 
          class="tab-button" 
          :class="{ active: activeTab === 'invite' }"
          @click="activeTab = 'invite'"
        >
          Invite
        </button>
      </div>
    </div>

    <div v-if="activeTab === 'invite'" class="content-section">
      <h2>Invite Crew Members</h2>
      <div class="invite-form">
        <label>Enter email(s) for crew members to invite:</label>
        <textarea 
          v-model="emailInput" 
          class="email-input" 
          placeholder="Enter email addresses..."
          rows="8"
        ></textarea>
        <button @click="sendInvites" class="send-button">Send</button>
      </div>
    </div>

    <div v-if="activeTab === 'manage'" class="content-section">
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
              <td class="name-column">
                <a href="#" class="member-link">{{ member.name }}</a>
              </td>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('manage')

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

<script>
import axios from 'axios';
export default {
  data() {
    return {
      activeTab: 'manage',
      emailInput: '',
      url: 'http://localhost:5228/invite',
      emailDTO: {
        emails: []
      }
    }
  },
  methods: {
    sendInvites() {
      console.log(this.emailInput)

      this.emailDTO.emails = this.emailInput.split('\n')

      // Handle sending invites
      console.log('invites to:', this.emailDTO)
      // Add your invite logic here
      axios.post(this.url, this.emailDTO )
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error('Error sending invites:', error)
        })
    }
  }
}
</script>

<style scoped>
.crew-member-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin: 20px;
}

.header-box {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

h1 {
  font-size: 32px;
  color: #333;
  margin: 0 0 20px 0;
}

.tab-container {
  display: flex;
  gap: 20px;
}

.tab-button {
  padding: 10px 20px;
  text-decoration: none;
  color: #666;
  font-size: 16px;
  position: relative;
  border: 1px solid transparent;
  background: none;
  cursor: pointer;
}

.tab-button.active {
  color: #4d1979;
  font-weight: bold;
  border: 1px solid #4d1979;
  border-radius: 4px;
}

.content-section {
  padding: 20px;
  background-color: white;
  border-radius: 4px;
}

h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.invite-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.invite-form label {
  color: #333;
  font-size: 16px;
}

.email-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: Arial, sans-serif;
  resize: vertical;
}

.send-button {
  align-self: flex-start;
  padding: 10px 40px;
  background-color: #4d1979;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.send-button:hover {
  background-color: #3b1259;
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
  overflow-x: auto;
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

.name-column a {
  color: #4d1979;
  text-decoration: none;
}

.name-column a:hover {
  text-decoration: underline;
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

.message-btn:hover {
  background-color: #888;
}

.delete-btn:hover {
  background-color: #c82333;
}

@media (max-width: 768px) {
  .crew-member-container {
    margin: 10px;
  }
  
  .content-section {
    padding: 15px;
  }
  
  .search-section,
  .action-buttons {
    flex-direction: column;
  }
  
  .message-btn,
  .delete-btn {
    width: 100%;
  }
}
</style>
