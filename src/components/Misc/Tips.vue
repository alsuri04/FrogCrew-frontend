<template>
  <div class="body">
    <div class="tip-container">
      <h1>Leave a tip?</h1>
      <div class="tip-buttons">
        <button class="tip-button">15%</button>
        <button class="tip-button">20%</button>
        <button class="tip-button">25%</button>
      </div>
      <button class="custom-button">Custom</button>
    </div>
  </div>
</template>

<style scoped>
.body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  margin: 0;
}

.tip-container {
  text-align: center;
  background-color: #ffffff;
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tip-container h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.tip-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.tip-button, .custom-button {
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  flex: 1;
  margin: 0 5px;
  transition: background-color 0.3s ease;
}

.custom-button {
  margin-top: 10px;
  flex: none;
  width: 100%;
}

.tip-button:hover, .custom-button:hover {
  background-color: #0056b3;
}

.tip-button:first-child {
  margin-left: 0;
}

.tip-button:last-child {
  margin-right: 0;
}

</style>
