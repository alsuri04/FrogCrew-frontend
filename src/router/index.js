import { createRouter, createWebHistory } from 'vue-router'
import AdminHomeView from '../views/AdminHomeView.vue'
import CrewScheduleView from '../views/CrewScheduleView.vue'
import GameScheduleView from '../views/GameScheduleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AdminHomeView
    },
    {
      path: '/schedule',
      name: 'schedule',
      children: [
        {
          path: 'crew',
          name: 'crewSchedule',
          component: CrewScheduleView
        },
        {
          path: 'games',
          name: 'gameSchedule',
          component: GameScheduleView
        }
      ]
    }
  ]
})

export default router
