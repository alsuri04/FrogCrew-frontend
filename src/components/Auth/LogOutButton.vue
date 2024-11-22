<template>
  <div>
    <button class="icon-button" v-if="!$route.meta.hideNavbar" @click="showLogoutConfirm = true">
      <span class="material-symbols-outlined">logout</span>
    </button>

    <div v-if="showLogoutConfirm" class="modal-overlay">
      <div class="modal">
        <div class="modal-content">
          <h3>Are you sure you want to log out?</h3>
          <div class="modal-buttons">
            <button class="btn-logout" @click="handleLogout">Log out</button>
            <button class="btn-cancel" @click="showLogoutConfirm = false">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const showLogoutConfirm = ref(false);

const handleLogout = () => {
  store.commit('setAuthentication', false);
  store.commit('setIsAdmin', false);

  localStorage.removeItem('authToken');
  localStorage.removeItem('UserId');
  localStorage.removeItem('IsAdmin')
  localStorage.removeItem('IsAuthenticated')

  router.push('/');
  showLogoutConfirm.value = false;
};
</script>

<style scoped>
.icon-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  line-height: 0;
}

.material-symbols-outlined {
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  width: 90%;
  max-width: 400px;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-content {
  text-align: center;
}

.modal-content h3 {
  margin-bottom: 2rem;
  font-size: 1.5rem;
  color: #333;
  font-weight: normal;
}

.modal-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-logout {
  padding: 0.75rem 2rem;
  background-color: #4B2E83; /* TCU Purple */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  min-width: 120px;
}

.btn-cancel {
  padding: 0.75rem 2rem;
  background-color: white;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  min-width: 120px;
}

.btn-logout:hover {
  background-color: #3b2568; /* Darker TCU Purple */
}

.btn-cancel:hover {
  background-color: #f5f5f5;
}
</style>