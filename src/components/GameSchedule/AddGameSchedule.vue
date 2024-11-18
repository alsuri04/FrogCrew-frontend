<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Add New Sport</h2>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>
      
      <div class="modal-body">
        <div class="form-group">
          <label for="sportName">Sport Name:</label>
          <select id="sportName" v-model="GameScheduleDTO.Sport" class="form-input">
            <option v-for="sport in sportsList" :key="sport" :value="sport">{{ sport }}</option>
            <option value="addNew">Add New Sport</option>
          </select>
        </div>

        <div v-if="GameScheduleDTO.Sport === 'addNew'" class="form-group">
          <label for="newSportName">New Sport Name:</label>
          <input 
            type="text" 
            id="newSportName" 
            v-model="GameScheduleDTO.Sport" 
            class="form-input"
            placeholder="Enter new sport name"
          />
        </div>

        <div class="form-group">
          <label for="sportYear">Season:</label>
          <input
            v-model="GameScheduleDTO.Season" 
            class="form-input"
            placeholder="Example: 2024-2025"
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

<script>
import axios from 'axios';
export default {
  data() {
    return {
      sportsList: ['Basketball', 'Soccer', 'Baseball'],
      GameScheduleDTO: {
        Sport: '',
        Season: '',
      }
    }
  },
  methods: {
    handleSubmit() {
      axios.post('https://localhost:8080/gameSchedule', this.GameScheduleDTO)
        .then(response => { 
          console.log('Sport added:', response.data)
        })
        .catch(error => {
          console.error('Error adding sport:', error)
        })
      this.closeModal()
    },
    closeModal() {
      this.$emit('close')
    }
  }
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
