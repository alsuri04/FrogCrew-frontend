<template>
  <div class="crew-member-container">
    <div class="header-box">
      <h1>Crew Members</h1>
      <div class="tab-container">
        <button 
          class="tab-button" 
          :class="{ active: activeTab === 'invite' }"
          @click="activeTab = 'invite'"
        >
          Invite
        </button>
        <button 
          class="tab-button" 
          :class="{ active: activeTab === 'manage' }"
          @click="activeTab = 'manage'"
        >
          Manage
        </button>
      </div>
    </div>

    <div class="content-section" v-if="activeTab === 'invite'">
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

    <div class="content-section" v-if="activeTab === 'manage'">
      <!-- Manage content here -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('invite')
const emailInput = ref('')

const sendInvites = () => {
  // Handle sending invites
  console.log('Sending invites to:', emailInput.value)
  // Add your invite logic here
}
</script>

<style scoped>
.crew-member-container {
  padding: 20px;
  background-color: #f5f5f5;
}

.header-box {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  margin-bottom: 20px;
}

.header-box h1 {
  margin: 0 0 20px 0;
  color: #333;
}

.tab-container {
  border-bottom: 1px solid #e0e0e0;
}

.tab-button {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  position: relative;
}

.tab-button.active {
  color: #4d1979;
  font-weight: bold;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #4d1979;
}

.content-section {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

.content-section h2 {
  margin: 0 0 20px 0;
  color: #333;
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

/* Add responsive styles */
@media (max-width: 768px) {
  .crew-member-container {
    padding: 10px;
  }
  
  .header-box,
  .content-section {
    padding: 15px;
  }
  
  .send-button {
    width: 100%;
  }
}
</style>
