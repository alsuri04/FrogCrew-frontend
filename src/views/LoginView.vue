<!-- src/views/LoginView.vue -->
<template>
    <!-- The container class is applied to center the login page content -->
    <div class="login-page container">
      <!-- This will render the Login component -->
      <Login id="login-block"/>
    </div>
  </template>
  
  <script>
  // Import the Login component
  import Login from '../components/Auth/UserLogin.vue';
  import { RouterLink } from 'vue-router'
  export default {
    components: {
      Login, // Register the Login component locally
    }
  };
  
  </script>
  
  <style scoped>
  /* Styling the container to center the content using Flexbox */
  .container {
    display: flex;
    align-items:center;  /* Horizontal center */
    transform: translateX(-125px); 
    align-items: center;      /* Vertically center */
    height: 50vh;
       
  }
  
  /* Additional styling for the login page itself */
  /* Optional: Styling the Login component if necessary */
  .component {
    width: 200px;             /* Example width */
    height: 100px;            /* Example height */
  }
  </style>
  