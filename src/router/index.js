import { createRouter, createWebHistory } from 'vue-router'
import CrewScheduleView from '../views/CrewScheduleView.vue'
import GameScheduleView from '../views/GameScheduleView.vue'
import FindCrewSchedule from '../components/CrewSchedule/FindCrewSchedule.vue'
import AddCrewSchedule from '../components/CrewSchedule/AddCrewSchedule.vue'
import UpdateCrewSchedule from '../components/CrewSchedule/UpdateCrewSchedule.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/schedule',
      children: [
        {
          path: 'crew',
          name: 'crewSchedule',
          component: FindCrewSchedule
        },
        {
          path: 'crew/add/:sportId',
          name: 'addCrewSchedule',
          component: AddCrewSchedule,
          props: true
        },
        {
          path: 'crew/:scheduleId',
          name: 'viewSchedule',
          component: UpdateCrewSchedule,
          props: true
        },
        {
          path: 'games',
          name: 'gameSchedule',
          component: GameScheduleView
        },
        {
          path: 'crew/:gameId',
          name: 'viewSchedule',
          component: FindCrewList,
          props: true,
        },
        {
          path: '/schedule/crewList',
          children: [
            {
              path: '',
              name: 'findCrewList',
              component: FindCrewList
            },
            {
              path: 'games/:sportId',
              name: 'gamesList',
              component: GamesList,
              props: true
            },
            {
              path: 'game/:gameId',
              name: 'crewList',
              component: CrewList,
              props: true
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: UserLogin
    }
  ]
});

export default router;
