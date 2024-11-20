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
import LoginView from '../views/LoginView.vue'
import NavBar from '@/components/Navigation/NavBar.vue'
import AddAvailability from '@/components/CrewMember/AddAvailability.vue'
import CreateProfile from '@/components/CrewMember/CreateProfile.vue'
import AdminHomeView from '@/views/AdminHomeView.vue'
import AvailabilityView from '@/views/AvailabilityView.vue'

const routes = [
  {
    path: '/login',
    name: 'loginView',
    component: LoginView,
    meta: {
      hideNavbar: true
    }
  },
  {
    path: '/home',
    name: 'homepage',
    component: AdminHomeView
  },
  {
    path: '/admin',
    name: 'adminHome',
    component: AdminHomeView
  },
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
        path: 'crew/update/:gameId',
        name: 'updateCrewSchedule',
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
        props: true
      },
      {
        path: 'crewList',
        name: 'findCrewList',
        component: FindCrewList
      },
      {
        path: 'crewList/games/:scheduleId',
        name: 'gamesList',
        component: GamesList,
        props: true
      },
      {
        path: 'crewList/game/:gameId',
        name: 'crewList',
        component: CrewList,
        props: true
      }
    ]
  },
  {
    path: '/crew-members',
    component: FindCrewMember,
    children: [
      {
        path: 'manage',
        name: 'manageCrewMembers',
        component: ManageCrewMembers
      },
      {
        path: 'invite',
        name: 'addCrewMember',
        component: AddCrewMember
      }
    ]
  },
  {
    path: '/create-profile',
    name: 'createProfile',
    component: CreateProfile
  },
  {
    path: '/availability/:scheduleId',
    name: 'Availability',
    component: AvailabilityView,
    props: true
  },
  {
    path: '/games-list',
    name: 'GamesList',
    component: GamesList
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
