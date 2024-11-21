<template>
  <div class="top-bar">
      <span class="frogcrew-text">FROGCREW</span>
  </div>
  <div class="create-profile-container">
    <h1>Create Crew Member Profile</h1>
    <form @submit.prevent="submitProfile">
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="userDTO.FirstName" required />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="userDTO.LastName" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="userDTO.Email" required />
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
        <input type="tel" id="phone" v-model="userDTO.PhoneNumber" required />
      </div>
      <div class="form-group">
        <label for="role">Role:</label>
        <select id="role" v-model="userDTO.Role" required>
          <option value="Freelancer">Freelancer</option>
          <option value="Student">Student</option>
          <option value="Faculty/Staff">Faculty/Staff</option>
        </select>
      </div>
      <div class="form-group">
        <label>Positions:</label>
        <div v-for="pos in positions" :key="pos" class="checkbox-group">
          <input type="checkbox" :id="pos" :value="pos" v-model="userDTO.Position" />
          <label :for="pos">{{ pos }}</label>
        </div>
      </div>
      <button type="submit">Create Profile</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      password: '',
      verifyPassword: '',
      showPassword: false,
      showVerifyPassword: false,
      positions: [
        'PRODUCER', 'ASST PROD', 'DIRECTOR', 'ASST DIRECTOR',
        'TECHNICAL DIR', 'GRAPHICS', 'BUG OP', 'REPLAY EVS',
        'VIDEO', 'EIC', '2ND ENG', 'AUDIO',
        'CAMERA', 'UTILITY',
        'INTERN', 'OBSERVER',
      ],
      userDTO: {
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNumber: '',
        Role: '',
        Position: []
      }
    }
  },
  methods: {
    submitProfile() {
      if (this.password !== this.verifyPassword) {
        this.errorMessage = 'Passwords do not match!'
        return
      }

      this.errorMessage = ''

      console.log('Creating profile:', this.userDTO)

      axios.post('http://localhost:5228/crewMember', this.userDTO)
      .then(response => {
        console.log('Profile Created:', response.data)
      })
      .catch(error => {
        console.error('Error creating profile:', error)
      })
    }
  }
}
</script>

<style scoped>
.top-bar {
  background-color: #4B2E83;
  width: 100%;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
}

.frogcrew-text {
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

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

