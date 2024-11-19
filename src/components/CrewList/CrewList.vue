<template>
  <div class="find-crew-list">
    <div class="header-container">
      <div class="header-top">
        <h1>Crew List</h1>
        <button @click="router.back()" class="back-btn">Back to Games</button>
      </div>
    </div>

    <div class="table-container">
      <table class="crew-table">
        <thead>
          <tr>
            <th>POSITION</th>
            <th>NAME</th>
            <th>REPORT TIME</th>
            <th>REPORT LOCATION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="crewMember in crewedMembers" :key="crewMember.userId">
            <td>{{ crewMember.position }}</td>
            <td>{{ crewMember.fullName || '-' }}</td>
            <td>{{ crewMember.reportTime || '-' }}</td>
            <td>{{ this.getPositionText(crewMember.position) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
  props: ['gameId'],
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      crewedMembers: [],
      ControlRoom: ['PRODUCER', 'ASST PROD', 'DIRECTOR', 'ASST DIRECTOR', 'TECHNICAL DIR', 'GRAPHICS', 'BUG OP', 'REPLAY EVS', 'REPLAY EVS 1', 'REPLAY EVS 2', 'REPLAY EVS 3', 'EIC', 'VIDEO', 'OBSERVER'],
      Stadium: ['2ND ENG', 'AUDIO ', 'AUDIO 1', 'AUDIO 2', 'CAMERA', 'CAMERA 1', 'CAMERA 2', 'CAMERA 3', 'CAMERA 4', 'CAMERA 5', 'CAMERA 6', 'UTILITY', 'TECH MANAGER', 'TOC']
    }
  },
  created() {
    this.getCrewList();
  },
  methods: {
    getCrewList() {
      axios.get(`http://localhost:5228/crewList/${this.gameId}`)
        .then(response => {
          this.crewedMembers = response.data.data.crewedMembers;
          console.log('Crew List:', this.crewedMembers);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });

    },
    getPositionText(position) {
      if (this.ControlRoom.includes(position)) {
        return 'Control Room'
      } else if (this.Stadium.includes(position)) {
        return 'Stadium'
      } else {
        return position
      }
    }

  }
}
</script>

<style scoped>
.find-crew-list {
  padding: 20px;
  color: black;
}

.header-container {
  margin-bottom: 30px;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  gap: 10px;
}

.back-btn {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-btn:hover {
  background-color: #45a049;
}

.download-btn {
  padding: 8px 16px;
  background-color: #1976D2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.download-btn:hover {
  background-color: #1565C0;
}

.table-container {
  margin: 20px 0;
  overflow-x: auto;
}

.crew-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  color: black;
}

.crew-table th,
.crew-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid black;
  color: black;
}

.crew-table th {
  background-color: white;
  font-weight: bold;
  color: black;
}

/* Make the table read-only looking */
.crew-table td {
  background-color: #f8f9fa;
}
</style> 