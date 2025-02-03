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
        <input 
          type="text" 
          id="phone" 
          v-model="userDTO.PhoneNumber"
          @input="validatePhoneNumber"
          maxlength="10"
          placeholder="10 digit phone number"
          required 
        />
        <div v-if="phoneError" class="error-message">{{ phoneError }}</div>
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
      <button type="submit" @click="handleButtonClick">Create Profile</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    return { route };
  },
  data() {
    return {
      password: '',
      verifyPassword: '',
      showPassword: false,
      showVerifyPassword: false,
      phoneError: '',
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
      },
      errorMessage: ''
    }
  },
  methods: {
    validatePhoneNumber(event) {
      // Remove any non-numeric characters
      this.userDTO.PhoneNumber = event.target.value.replace(/\D/g, '');
      
      // Show error if non-numeric characters were entered
      if (event.target.value !== this.userDTO.PhoneNumber) {
        this.phoneError = 'Only numbers are allowed';
      } else if (this.userDTO.PhoneNumber.length !== 10 && this.userDTO.PhoneNumber.length > 0) {
        this.phoneError = 'Phone number must be 10 digits';
      } else {
        this.phoneError = '';
      }
    },
    submitProfile() {
      if (this.password !== this.verifyPassword) {
        this.errorMessage = 'Passwords do not match!'
        return
      }

      if (this.userDTO.PhoneNumber.length !== 10) {
        this.errorMessage = 'Please enter a valid 10-digit phone number'
        return
      }

      this.errorMessage = ''

      const token = this.route.query.token; // Get token from URL query parameter
      const profileData = {
        ...this.userDTO,
        Password: this.password
      };

      axios.post(`http://localhost:5228/crewMember?token=${token}`, profileData)
        .then(response => {
          console.log('Profile Created:', response.data)
          alert('Profile successfully created!')
          this.navigateToLogin()
        })
        .catch(error => {
          console.error('Error creating profile:', error)
          this.errorMessage = 'Error creating profile. Please try again.'
        })
    },
    handleButtonClick() {
      // This method is intentionally left empty to prevent default behavior
    },
    navigateToLogin() {
      this.$router.push('/')
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
  font-size: 0.8em;
  margin-top: 5px;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
}
</style>

