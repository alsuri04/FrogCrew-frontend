<!-- src/components/Profile/Profile.vue -->
<template>
  <div class="profile-page">
    <div class="profile-container">
      <div class="profile-header">
        <h1>Crew Member</h1>
        <div class="tabs">
          <span class="tab active">Profile</span>
          <span class="tab">Notifications</span>
        </div>
      </div>
      <div class="profile-content">
        <div class="profile-picture">
          <span class="material-symbols-outlined default-avatar">account_circle</span>
          <div class="profile-name">
            <h2>{{ profile.FirstName }} {{ profile.LastName }}</h2>
            <p class="roles">Roles: {{ profile.Role }}</p>
          </div>
        </div>
        <div class="profile-details">
          <div class="detail-item">
            <label>Name*</label>
            <input type="text" :value="profile.FirstName" disabled />
          </div>
          <div class="detail-item">
            <label>Email*</label>
            <input type="email" :value="profile.Email" disabled />
          </div>
          <div class="detail-item">
            <label>Phone Number*</label>
            <input type="tel" :value="profile.PhoneNumber" disabled />
          </div>
          <div class="detail-item">
            <label>Roles*</label>
            <ul class="roles-list">
              <li v-for="role in profile.Position" :key="role">{{ role }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const profile = ref({
  FirstName: '',
  LastName: '',
  Email: '',
  PhoneNumber: '',
  Role: '',
  Position: []
});

const roles = ['PRODUCER', 'ASST PROD', 'DIRECTOR', 'ASST DIRECTOR',
  'TECHNICAL DIR', 'GRAPHICS', 'BUG OP', 'REPLAY EVS',
  'VIDEO', 'EIC', '2ND ENG', 'AUDIO',
  'CAMERA', 'UTILITY',
  'INTERN', 'OBSERVER'];

onMounted(async () => {
  try {
    const userId = route.params.id;
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`http://localhost:5228/crewMember/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    profile.value = response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
});
</script>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  height: 100%;
  width: 100%;
}

.profile-container {
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  padding: 20px;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1rem;
}

.profile-header h1 {
  font-size: 24px;
  color: #333;
  margin: 0;
}

.tabs {
  display: flex;
  gap: 20px;
}

.tab {
  cursor: pointer;
  padding-bottom: 5px;
  color: #666;
}

.tab.active {
  border-bottom: 2px solid #4B2E83;
  color: #4B2E83;
}

.profile-content {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  gap: 40px;
}

.profile-picture {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
}

.default-avatar {
  font-size: 100px;
  color: #4B2E83;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.profile-name {
  text-align: center;
}

.profile-name h2 {
  margin: 0;
  color: #333;
}

.roles {
  font-style: italic;
  color: #666;
  margin: 5px 0 0 0;
}

.profile-details {
  flex: 1;
}

.detail-item {
  margin-bottom: 15px;
}

.detail-item label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.detail-item input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f5f5f5;
  color: #666;
}

.roles-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.roles-list li {
  margin-bottom: 5px;
  color: #333;
}
</style>