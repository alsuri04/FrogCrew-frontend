<template>
    <div class="tradeboard-container">
      <h2>Recent Tradeboard Posts</h2>
      <table class="tradeboard-table">
        <thead>
          <tr>
            <th>Game</th>
            <th>Dropper</th>
            <th>Position</th>
            <th>Status</th>
            <th>Receiver</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trade in trades" :key="trade.tradeId">
            <td>
              Game {{ trade.gameId }}
            </td>
            <td>User {{ trade.dropperId }}</td>
            <td>{{ trade.position }}</td>
            <td>
              <span :class="getStatusClass(trade.status)">
                {{ trade.status }}
              </span>
            </td>
            <td>{{ trade.receiverId || '-' }}</td>
            <td>
              <button 
                v-if="trade.status === 'AVAILABLE'"
                class="pickup-btn" 
                @click="pickupShift(trade.tradeId)">
                Pick Up
              </button>
              <button 
                v-if="canApprove(trade)"
                class="approve-btn" 
                @click="approveShift(trade.tradeId)">
                Approve
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div class="information-section">
        <h3>Information</h3>
        <p>- List includes all available shifts and pending trades.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TradeBoard',
    data() {
      return {
        trades: [],
        currentUserId: null
      }
    },
    created() {
      // Get current user ID from store when component is created
      this.currentUserId = this.$store.state.userId
      this.fetchTrades()
    },
    methods: {
      getStatusClass(status) {
        return {
          'status': true,
          'available': status === 'AVAILABLE',
          'pending': status === 'awaiting approval',
          'approved': status === 'approved'
        }
      },
      async fetchTrades() {
        try {
          const response = await fetch('/api/TradeBoard/tradeboard')
          const result = await response.json()
          if (result.flag) {
            this.trades = result.data
          }
        } catch (error) {
          console.error('Error fetching trades:', error)
        }
      },
      async pickupShift(tradeId) {
        try {
          const response = await fetch(`/api/TradeBoard/pickup/${tradeId}/${this.currentUserId}`, {
            method: 'PUT'
          })
          const result = await response.json()
          if (result.flag) {
            await this.fetchTrades()
          } else {
            alert(result.message)
          }
        } catch (error) {
          console.error('Error picking up shift:', error)
        }
      },
      async approveShift(tradeId) {
        try {
          const response = await fetch(`/api/TradeBoard/approve/${tradeId}`, {
            method: 'PUT'
          })
          const result = await response.json()
          if (result.flag) {
            await this.fetchTrades()
          } else {
            alert(result.message)
          }
        } catch (error) {
          console.error('Error approving shift:', error)
        }
      },
      canApprove(trade) {
        return trade.status === 'awaiting approval' && trade.dropperId === this.currentUserId
      }
    }
  }
  </script>
  
  <style scoped>
  .tradeboard-container {
    padding: 20px;
    background-color: #fff;
    color: #000;
  }
  
  .tradeboard-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .tradeboard-table th,
  .tradeboard-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    color: #000;
  }
  
  .tradeboard-table th {
    background-color: #f5f5f5;
    font-weight: bold;
  }
  
  .status {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.9em;
  }
  
  .available {
    background-color: #e3f2fd;
    color: #1976d2;
  }
  
  .pending {
    background-color: #fff3e0;
    color: #f57c00;
  }
  
  .approved {
    background-color: #e8f5e9;
    color: #388e3c;
  }
  
  .pickup-btn,
  .approve-btn {
    background-color: #1976d2;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 4px;
  }
  
  .approve-btn {
    background-color: #388e3c;
  }
  
  .pickup-btn:hover {
    background-color: #1565c0;
  }
  
  .approve-btn:hover {
    background-color: #2e7d32;
  }
  
  .information-section {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 4px;
  }
  
  .information-section h3 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  </style>
  