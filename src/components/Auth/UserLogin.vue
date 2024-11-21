<template>
  <div>
    <header class="header">
      <button class="menu-toggle" style="visibility: hidden;">
        <span class="menu-icon">☰</span>
      </button>
      <h1 class="logo">FROGCREW</h1>
    </header>

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
          <p class="contact-info">Contact<a href="mailto:m.martin@tcu.edu">Admin</a></p>
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
      username: '',
      password: ''
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

          // Store Auth Token
          const token = response.data.data.token; // Assuming the token is returned in response data
          localStorage.setItem('authToken', token); // Storing token in local storage
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Setting default header

          // Store User Id
          localStorage.setItem('UserId', response.data.data.userId);

          // Store isAdmin
          if(response.data.data.role === 'ADMIN') {
            this.$store.commit('setIsAdmin', true);
            localStorage.setItem('IsAdmin', true);
          }
          
          // Set Authentication to true
          this.$store.commit('setAuthentication', true);
          localStorage.setItem('IsAuthenticated', true);

          // Route to dashboard
          this.$router.push('/dashboard'); // Redirecting to the home route
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    },
  }
};
</script>

<style scoped>
.app-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.header {
  background-color: #4B2E83;
  padding: 0 15px;
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: none;
}

.logo {
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 0.5px;
  margin: 0;
  padding: 0;
  border-bottom: none;
  text-decoration: none;
}

.menu-toggle {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  margin-right: 10px;
}

/* Update login container to account for new header height */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 50px);  /* Updated to match header height */
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