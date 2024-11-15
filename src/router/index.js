import { createRouter, createWebHistory } from 'vue-router'
import CrewScheduleView from '../views/CrewScheduleView.vue'
import GameScheduleView from '../views/GameScheduleView.vue'
import FindCrewSchedule from '../components/CrewSchedule/FindCrewSchedule.vue'
import AddCrewSchedule from '../components/CrewSchedule/AddCrewSchedule.vue'
import UpdateCrewSchedule from '../components/CrewSchedule/UpdateCrewSchedule.vue'
import FindCrewList from '../components/CrewList/FindCrewList.vue'
import GamesList from '@/components/CrewList/GamesList.vue'
import CrewList from '@/components/CrewList/CrewList.vue'
import AddCrewMember from '@/components/CrewMember/AddCrewMember.vue'
import FindCrewMember from '../components/CrewMember/FindCrewMember.vue'
import ManageCrewMembers from '@/components/CrewMember/ManageCrewMembers.vue'

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
            },
            {
              path: '/crew-members',
              component: FindCrewMember,
              children: [
                {
                  path: 'manage',
                  component: ManageCrewMembers,
                },
                {
                  path: 'invite',
                  component: AddCrewMember,
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})

export default router
