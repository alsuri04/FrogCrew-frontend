<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Add New Sport</h2>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>
      
      <div class="modal-body">
        <div class="form-group">
          <label for="sportCategory">Sport Category:</label>
          <select id="sportCategory" v-model="newSport.category" class="form-input">
            <option value="Men's Sports">Men's Sports</option>
            <option value="Women's Sports">Women's Sports</option>
          </select>
        </div>

        <div class="form-group">
          <label for="sportName">Sport Name:</label>
          <input 
            type="text" 
            id="sportName" 
            v-model="newSport.name" 
            class="form-input"
            placeholder="Enter sport name"
          />
        </div>
      </div>

      <div class="modal-footer">
        <button class="cancel-btn" @click="closeModal">Cancel</button>
        <button class="submit-btn" @click="handleSubmit">Add Sport</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'submit'])

const newSport = ref({
  category: "Men's Sports",
  name: '',
  gameCount: 0
})

const closeModal = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('submit', newSport.value)
  newSport.value = {
    category: "Men's Sports",
    name: '',
    gameCount: 0
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
