<script setup>
import Tips from '@/components/Misc/Tips.vue';

</script>

<template>
  <div class="admin-home">
    <div class="banner" @click="toggleTips">
      <h1 >Homepage</h1>
    </div>
    <Tips v-if="showTips"></Tips>
    <!-- Rest of your admin content -->
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTips: false
    }
  },
  methods: {
    toggleTips() {
      this.showTips = !this.showTips;
    }
  }
}
</script>

<style scoped>
.admin-home {
  min-height: 100vh;
}

.banner {
  position: relative;
  height: 300px;
  width: 100%;
  background-image: url('@/images/superfrogSmoke.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding-left: 50px;
  margin-bottom: 30px;
}

.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to right,
    rgba(77, 25, 121, 0.9) 0%,  /* TCU purple */
    rgba(77, 25, 121, 0.7) 50%,
    rgba(77, 25, 121, 0.4) 100%
  );
}

.banner h1 {
  color: white;
  font-size: 4rem;
  font-family: 'Playfair Display', serif;
  position: relative;
  z-index: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
</style>
