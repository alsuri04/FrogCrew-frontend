<template>
  <div class="find-crew-list">
    <div class="header-container">
      <div class="header-top">
        <h1>Crew Schedule</h1>
        <button @click="router.back()" class="back-btn">Back to Games</button>
      </div>
      <div class="action-buttons">
        <button @click="finalizeList" class="finalize-btn">Finalize</button>
        <button @click="saveChanges()" class="submit-btn">Save Changes</button>
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
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <!-- Show message if no crew members -->
          <tr v-if="!crewedMembers || crewedMembers.length === 0">
            <td colspan="5">Loading crew members... {{ position }}</td>
          </tr>

          <!-- If we have crew members, show them -->
          <tr v-for="pos in position" :key="pos">
            <td>
              <span class="position-display">
                {{ pos }}
              </span>
            </td>
            <td>
              <select
                v-model="crewedMembers[pos]"
                @change="storeChange(pos)"
                class="crew-select"
              >
                <option value="">Select Crew Member</option>
                <option
                  v-for="member in QualifiedUserLists[pos]"
                  :key="member.id"
                  :value="member"
                >
                  {{ member.fullName }}
                </option>
              </select>
            </td>
            <td>
              <input type="text" class="time-input" placeholder="Enter time" />
            </td>
            <td>
              <select class="location-select">
                <option value="CONTROL ROOM">CONTROL ROOM</option>
                <option value="STADIUM">STADIUM</option>
              </select>
            </td>
            <td>
              <button class="delete-btn"hidden>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bottom-button-container">
      <button @click="addNewPosition" class="add-btn"hidden>Add New Position</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from 'vue-router';
export default {
  props: ["gameId"],
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      crewedMembers: [],
      position: [
        "PRODUCER",
        "ASSISTANT PRODUCER",
        "DIRECTOR",
        "ASSISTANT DIRECTOR",
        "TECHNICAL DIRECTOR",
        "GRAPHICS OPERATOR",
        "BUG OPERATOR",
        "EVS REPLAY-LEAD",
        "VIDEO OPERATOR",
        "EIC",
        "ENG 2",
        "AUDIO A1",
        "AUDIO ASSISTANT A2",
        "CAMERA-FIXED",
        "CAMERA-HANDHELD",
        "CAMERA-STEADICAM",
        "UTILITY",
        "TIME OUT COORDINATOR",
      ],
      QualifiedUserLists: {
        PRODUCER: [],
        "ASSISTANT PRODUCER": [],
        DIRECTOR: [],
        "ASSISTANT DIRECTOR": [],
        "TECHNICAL DIRECTOR": [],
        "GRAPHICS OPERATOR": [],
        "BUG OPERATOR": [],
        "EVS REPLAY-LEAD": [],
        "VIDEO OPERATOR": [],
        EIC: [],
        "ENG 2": [],
        "AUDIO A1": [],
        "AUDIO ASSISTANT A2": [],
        "CAMERA-FIXED": [],
        "CAMERA-HANDHELD": [],
        "CAMERA-STEADICAM": [],
        UTILITY: [],
        "TIME OUT COORDINATOR": [],
      },
      changes: [],
    };
  },
  created() {
    this.getMembers();
    this.getQualifiedUsers();
  },
  methods: {
    getMembers() {
      console.log("Fetching members for game:", this.gameId); // Debug log
      axios
        .get(`http://localhost:5228/crewSchedule/${this.gameId}`)
        .then((response) => {
          this.crewedMembers = response.data.data;
          console.log("Loaded crew members:", this.crewedMembers); // Debug log
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    getQualifiedUsers() {
      this.position.forEach((pos) => {
        axios
          .get(`http://localhost:5228/crewMember/${this.gameId}/${pos}`)
          .then((response) => {
            // Extract just the fullName from each user object
            this.QualifiedUserLists[pos] = response.data.data;
            console.log(
              `Qualified users for ${pos}:`,
              this.QualifiedUserLists[pos]
            );
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      });
    },
    storeChange(pos) {
      console.log(this.crewedMembers[pos]);
      if (this.crewedMembers[pos].fullName === undefined) {
        const changeIndex = this.changes.findIndex((c) => c.position === pos);
        if (changeIndex !== -1) {
          this.changes.splice(changeIndex, 1);
        }
        console.log("Change removed. Current changes:", this.changes);
        return;
      }
      const change = {
        action: "assign",
        id: this.crewedMembers[pos].userId,
        position: pos,
        fullName: this.crewedMembers[pos].fullName,
      };
      this.changes.push(change);
      console.log(change);
    },

    saveChanges() {
      console.log("Saving changes:", this.changes);

      const crewScheduleDTO = {
        gameId: this.gameId,
        changes: this.changes,
      };
      console.log("Saving changes:", JSON.stringify(this.changes, null, 2)); // Nicely formatted JSON
      console.log("Full DTO:", JSON.stringify(crewScheduleDTO, null, 2));
      axios
        .post(`http://localhost:5228/crewSchedule`, crewScheduleDTO)
        .then((response) => {
          console.log("Changes saved successfully:", response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
  },
};
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

.action-buttons {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
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

.button-group {
  display: flex;
  gap: 10px;
}

.finalize-btn {
  padding: 8px 16px;
  background-color: #1976d2; /* Blue color for finalize */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.finalize-btn:hover {
  background-color: #1565c0;
}

.submit-btn {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #45a049;
}

.crew-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: Arial, sans-serif;
  background-color: white;
  color: black;
}

.crew-select option {
  color: black;
  background-color: white;
  padding: 8px;
}

/* Add hover effect for dropdown */
.crew-select:hover {
  border-color: #999;
}

/* Style for focused dropdown */
.crew-select:focus {
  outline: none;
  border-color: #4d1979;
  box-shadow: 0 0 3px rgba(77, 25, 121, 0.3);
}

.back-btn {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-btn:hover {
  background-color: #45a049;
}

.time-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: Arial, sans-serif;
  background-color: white;
  color: black;
}

.location-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: Arial, sans-serif;
  background-color: white;
  color: black;
}

.location-select option {
  color: black;
  background-color: white;
  padding: 8px;
}

/* Add hover effect for dropdown */
.location-select:hover {
  border-color: #999;
}

/* Style for focused dropdown */
.location-select:focus {
  outline: none;
  border-color: #4d1979;
  box-shadow: 0 0 3px rgba(77, 25, 121, 0.3);
}

.position-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: Arial, sans-serif;
  background-color: white;
  color: black;
}

.position-select option {
  color: black;
  background-color: white;
  padding: 8px;
}

/* Add hover effect for dropdown */
.position-select:hover {
  border-color: #999;
}

/* Style for focused dropdown */
.position-select:focus {
  outline: none;
  border-color: #4d1979;
  box-shadow: 0 0 3px rgba(77, 25, 121, 0.3);
}

.delete-btn {
  padding: 8px 16px;
  background-color: #d32f2f; /* Red color for delete */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #c62828;
}

.bottom-button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  padding: 0 20px;
}

.add-btn {
  padding: 10px 20px;
  background-color: #4d1979; /* TCU purple */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.add-btn:hover {
  background-color: #3b1259;
}

/* Make sure table cells align properly */
.crew-table td {
  vertical-align: middle;
}

/* Add some spacing in the action column */
.crew-table td:last-child {
  text-align: center;
  min-width: 100px;
}

.position-display {
  margin-left: 5px;
  color: #666;
  font-size: 0.9em;
}
</style>
