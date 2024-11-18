<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Add New Game</h2>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>
      
      <div class="modal-body">
        <div class="form-group">
          <label for="gameName">Game Name:</label>
          <input 
            type="text" 
            id="gameName" 
            v-model="newGame.name" 
            class="form-input"
            placeholder="Enter game name (e.g., TCU vs Baylor)"
          />
        </div>

        <div class="form-group">
          <label for="gameDate">Date:</label>
          <input 
            type="date" 
            id="gameDate" 
            v-model="newGame.date" 
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="gameLocation">Location:</label>
          <input 
            type="text" 
            id="gameLocation" 
            v-model="newGame.location" 
            class="form-input"
            placeholder="Enter game location"
          />
        </div>
      </div>

      <div class="modal-footer">
        <button class="cancel-btn" @click="closeModal">Cancel</button>
        <button class="submit-btn" @click="handleSubmit">Add Game</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'submit'])
const route = useRoute()

const newGame = ref({
  name: '',
  date: '',
  location: '',
  sportId: parseInt(route.params.sportId)
})

const closeModal = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('submit', newGame.value)
  newGame.value = {
    name: '',
    date: '',
    location: '',
    sportId: parseInt(route.params.sportId)
  }
  closeModal()
}
</script>

<style scoped>
.modal {
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

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h2 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn, .submit-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #f0f0f0;
  color: #333;
}

.submit-btn {
  background-color: #4d1979;
  color: white;
}

.submit-btn:hover {
  background-color: #3b1259;
}
</style>
