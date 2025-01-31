<!-- src/components/Profile/Profile.vue -->
<template>
  <div class="profile-page">
    <div class="profile-container">
      <div class="profile-header">
        <h1>Crew Member</h1>
        <div class="header-actions">
          <button v-if="isEditing" @click="cancelEdit" class="cancel-button">
            Cancel
          </button>
          <button @click="toggleEdit" class="edit-button">
            {{ isEditing ? 'Save' : 'Edit' }}
          </button>
        </div>
      </div>
      <div class="profile-content">
        <div class="profile-picture">
          <span class="material-symbols-outlined default-avatar">account_circle</span>
          <div class="profile-name">
            <h2>{{ profile.FirstName }} {{ profile.LastName }}</h2>
            <select v-if="isEditing" v-model="profile.Role" class="role-select">
              <option value="Freelancer">Freelancer</option>
              <option value="Student">Student</option>
              <option value="Faculty/Staff">Faculty/Staff</option>
            </select>
            <p v-else class="roles">{{ profile.Role }}</p>
          </div>
        </div>
        <div class="profile-details">
          <div class="detail-item">
            <label>First Name*</label>
            <input type="text" v-model="profile.FirstName" :disabled="!isEditing" />
          </div>
          <div class="detail-item">
            <label>Last Name*</label>
            <input type="text" v-model="profile.LastName" :disabled="!isEditing" />
          </div>
          <div class="detail-item">
            <label>Email*</label>
            <input type="email" v-model="profile.Email" :disabled="!isEditing" />
          </div>
          <div class="detail-item">
            <label>Phone Number*</label>
            <input type="tel" v-model="profile.PhoneNumber" :disabled="!isEditing" />
          </div>
          <div class="positions-section">
            <label>Positions*</label>
            <div v-if="isEditing" class="positions-grid">
              <div v-for="position in allPositions" 
                   :key="position" 
                   class="position-item"
                   :class="{ 'qualified': profile.Position.includes(position) }">
                <label class="position-checkbox">
                  <input 
                    type="checkbox" 
                    :value="position" 
                    v-model="profile.Position"
                  />
                  {{ position }}
                </label>
              </div>
            </div>
            <div v-else class="positions-grid">
              <div v-for="position in allPositions" 
                   :key="position" 
                   class="position-item"
                   :class="{
                     'qualified': profile.Position.includes(position),
                     'unqualified': !profile.Position.includes(position),
                     'editable': isEditing
                   }"
                   @click="isEditing && togglePosition(position)">
                {{ position }}
              </div>
            </div>
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
const isEditing = ref(false);
const profile = ref({
  FirstName: '',
  LastName: '',
  Email: '',
  PhoneNumber: '',
  Role: '',
  Position: []
});

// Add backup for cancel functionality
const profileBackup = ref(null);

const allPositions = [
  'PRODUCER', 'ASST PROD', 'DIRECTOR', 'ASST DIRECTOR',
  'TECHNICAL DIR', 'GRAPHICS', 'BUG OP', 'REPLAY EVS',
  'VIDEO', 'EIC', '2ND ENG', 'AUDIO',
  'CAMERA', 'UTILITY', 'INTERN', 'OBSERVER'
];

const cancelEdit = () => {
  // Restore the original data
  profile.value = JSON.parse(JSON.stringify(profileBackup.value));
  isEditing.value = false;
};

const toggleEdit = async () => {
  if (isEditing.value) {
    // Save changes
    try {
      const userId = route.params.id;
      const token = localStorage.getItem('authToken');
      await axios.put(`http://localhost:5228/crewMember/${userId}`, profile.value, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      isEditing.value = false;
      // Update backup after successful save
      profileBackup.value = JSON.parse(JSON.stringify(profile.value));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  } else {
    // Create backup before editing
    profileBackup.value = JSON.parse(JSON.stringify(profile.value));
    isEditing.value = true;
  }
};

const togglePosition = (position) => {
  if (profile.value.Position.includes(position)) {
    profile.value.Position = profile.value.Position.filter(p => p !== position);
  } else {
    profile.value.Position.push(position);
  }
};

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
    // Create initial backup
    profileBackup.value = JSON.parse(JSON.stringify(profile.value));
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

.header-actions {
  display: flex;
  gap: 10px;
}

.edit-button, .cancel-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.edit-button {
  background-color: #4B2E83;
  color: white;
}

.edit-button:hover {
  background-color: #3b2566;
}

.cancel-button {
  background-color: #f5f5f5;
  color: #666;
  border: 1px solid #ddd;
}

.cancel-button:hover {
  background-color: #e8e8e8;
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

.positions-section {
  margin-top: 20px;
}

.positions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  margin-top: 10px;
}

.position-item {
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  border: 1px solid #ddd;
  cursor: default;
}

.position-item.qualified {
  background-color: #4B2E83;
  color: white;
  border-color: #4B2E83;
}

.position-item.unqualified {
  background-color: #f5f5f5;
  color: #666;
}

.position-item.editable {
  cursor: pointer;
}

.position-item.editable:hover {
  opacity: 0.8;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}

select:disabled {
  background-color: #f5f5f5;
}

input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.role-select {
  margin-top: 5px;
  width: 150px;
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 0.9em;
}
</style>