<template>
  <div class="create-profile-container">
    <h1>Create Crew Member Profile</h1>
    <form @submit.prevent="submitProfile">
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="firstName" required />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="lastName" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required />
        <input type="checkbox" id="showPassword" v-model="showPassword" />
        <label for="showPassword">Show Password</label>
      </div>
      <div class="form-group">
        <label for="verifyPassword">Verify Password:</label>
        <input :type="showVerifyPassword ? 'text' : 'password'" id="verifyPassword" v-model="verifyPassword" required />
        <input type="checkbox" id="showVerifyPassword" v-model="showVerifyPassword" />
        <label for="showVerifyPassword">Show Verify Password</label>
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div class="form-group">
        <label for="phone">Phone Number:</label>
        <input type="tel" id="phone" v-model="phone" required />
      </div>
      <div class="form-group">
        <label for="role">Role:</label>
        <select id="role" v-model="role" required>
          <option value="Freelancer">Freelancer</option>
          <option value="Student">Student</option>
          <option value="Faculty/Staff">Faculty/Staff</option>
        </select>
      </div>
      <div class="form-group">
        <label>Positions:</label>
        <div v-for="pos in positions" :key="pos" class="checkbox-group">
          <input type="checkbox" :id="pos" :value="pos" v-model="selectedPositions" />
          <label :for="pos">{{ pos }}</label>
        </div>
      </div>
      <button type="submit">Create Profile</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const role = ref('')
const selectedPositions = ref([])
const password = ref('')
const verifyPassword = ref('')
const showPassword = ref(false)
const showVerifyPassword = ref(false)
const errorMessage = ref('')

const positions = [
  'PRODUCER', 'ASST PROD', 'DIRECTOR', 'ASST DIRECTOR',
  'TECHNICAL DIR', 'GRAPHICS', 'BUG OP', 'REPLAY EVS',
  'VIDEO', 'EIC', '2ND ENG', 'AUDIO',
  'CAMERA', 'UTILITY',
  'INTERN', 'OBSERVER',
]

const submitProfile = () => {
  if (password.value !== verifyPassword.value) {
    errorMessage.value = 'Passwords do not match!'
    return
  }

  errorMessage.value = ''

  const profileData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phone: phone.value,
    role: role.value,
    positions: selectedPositions.value,
    password: password.value
  }
  
  // API GOES HERE to submit profile data
  // Example:
  // await fetch('/api/crew-members', {
  //   method: 'POST',
  //   body: JSON.stringify(profileData),
  //   headers: { 'Content-Type': 'application/json' }
  // });

  console.log('Profile Created:', profileData)
}
</script>

<style scoped>
.create-profile-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

.checkbox-group {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

label {
  margin-left: 5px;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"],
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-bottom: 15px;
}
</style>

