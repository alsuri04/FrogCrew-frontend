<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          :class="{'input-error': usernameError}"
          placeholder="Email or Phone"
        />
        <span v-if="usernameError" class="error-message">{{ usernameError }}</span>
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          :class="{'input-error': passwordError}"
          placeholder="Password"
        />
        <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
      </div>

      <button type="submit" :disabled="isSubmitting">Login</button>
    </form>

    <p v-if="formError" class="error-message">{{ formError }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
      formError: '',
      isSubmitting: false,
    };
  },
  methods: {
    validateForm() {
      this.usernameError = '';
      this.passwordError = '';
      this.formError = '';

      // Simple validation logic
      if (!this.username) {
        this.usernameError = 'Username is required';
      }

      if (!this.password) {
        this.passwordError = 'Password is required';
      }

      return !this.usernameError && !this.passwordError;
    },
    submitForm() {
      if (!this.validateForm()) {
        return;
      }

      // Start form submission
      this.isSubmitting = true;

      // Simulate API call (you can replace this with actual login logic)
      setTimeout(() => {
        if (this.username === 'admin' && this.password === 'password') {
          alert('Login Successful');
          this.$router.push('/dashboard'); // Redirect to dashboard
        } else {
          this.formError = 'Invalid username or password';
        }

        this.isSubmitting = false;
      }, 1000);
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ddd;
}

.error-message {
  color: red;
  font-size: 12px;
}

.input-error {
  border-color: red;
}
</style>
