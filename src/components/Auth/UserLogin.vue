<template>
  <div>
    <!-- Simplified Top Bar -->
    <div class="top-bar">
      <span class="frogcrew-text">FROGCREW</span>
    </div>

    <div class="login-container">
      <div class="login-box">
        <h1>Login</h1>
        <form @submit.prevent="login">
          <input 
            v-model="username" 
            type="text" 
            placeholder="Email or Phone"
            class="form-input"
          />
          <input 
            v-model="password" 
            type="password" 
            placeholder="Password"
            class="form-input"
          />
          <a href="#" class="forgot-password">Forgot Password</a>
          <button type="submit" class="sign-in-btn">Sign In</button>
          <p class="account-request">Don't have an account?</p>
          <p class="contact-info">Email us at<a href="mailto:xxxx@tcu.edu">xxxx@tcu.edu</a></p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: 'kate.bednarz@tcu.edu',
      password: 'swiftie4lyfe'
    };
  },
  methods: {
    login() {
      const basicAuth = 'Basic ' + btoa(this.username + ":" + this.password);
      const authHeader = `Basic ${btoa(`${this.username}:${this.password}`)}`;
      axios.post('http://localhost:5228/auth/login', {}, { 
        headers: { 'Authorization': authHeader }
      })
        .then(response => {
          // console.log(response.data.data);
          // console.log('Token', response.data.data.token);
          // console.log('UserId', response.data.data.userId);
          // console.log('Role', response.data.data.role);

          const token = response.data.data.token; // Assuming the token is returned in response data
          localStorage.setItem('authToken', token); // Storing token in local storage
          localStorage.setItem('UserId', response.data.data.userId);

          if(response.data.data.role === 'admin') {
            this.$store.commit('setIsAdmin', true);
          }
        
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Setting default header
          this.$store.commit('setAuthentication', true);
          this.$router.push('/admin'); // Redirecting to the home route
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    },
  }
};
</script>

<style scoped>
/* Updated top bar styles */
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

/* Rest of your existing styles... */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 48px);  /* Adjusted for new top bar height */
  background-color: #f5f5f5;
}

.login-box {
  background: white;
  width: 400px;           /* Reduced width */
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: normal;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1rem;
}

.form-input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.forgot-password {
  display: block;
  text-align: right;
  color: #4285f4;
  text-decoration: none;
  font-size: 0.9rem;
  margin: 0.25rem 0 1rem 0;
  background: none;
}

.sign-in-btn {
  width: 100%;
  padding: 0.6rem;
  background-color: #4B2E83;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.95rem;
  cursor: pointer;
  margin: 0.5rem 0 1.5rem 0;
}

.account-request {
  text-align: center;
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.request-link {
  display: block;
  text-align: center;
  color: #4B2E83;
  text-decoration: none;
  margin: 0.25rem 0 1rem 0;
  font-weight: 500;
}

.contact-info {
  text-align: center;
  color: #666;
  font-size: 0.85rem;
  margin: 0;
}

.contact-info a {
  color: #4285f4;
  text-decoration: none;
}
</style>