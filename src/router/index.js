import { createRouter, createWebHistory } from 'vue-router'
import GameScheduleView from '../views/GameScheduleView.vue'
import UpdateCrewSchedule from '../components/Schedule/UpdateCrewSchedule.vue'
import FindCrewList from '../components/Schedule/ScheduleMain.vue'
import GamesList from '@/components/Schedule/ViewGamesList.vue'
import CrewList from '@/components/Schedule/ViewCrewList.vue'
import Misc from '@/components/CrewMembers/CrewMembersView.vue'
import InviteCrewMember from '@/components/CrewMembers/InviteCrewMember.vue'
import ManageCrewMember from '../components/CrewMembers/ManageCrewMember.vue'
import LoginView from '../views/LoginView.vue'
import AdminNavBar from '@/components/Navigation/AdminNavBar.vue'
import AddAvailability from '@/components/Schedule/AddAvailability.vue'
import CreateProfile from '@/components/Misc/CreateProfile.vue'
import AdminHomeView from '@/views/AdminHomeView.vue'
import AvailabilityView from '@/views/AvailabilityView.vue'
import UserLogin from '@/components/Auth/UserLogin.vue'
import Profile from '@/views/Profile.vue'
import CrewMembersView from '@/components/CrewMembers/CrewMembersView.vue'

const routes = [
  {
    path: '/login',
    name: 'loginView',
    component: UserLogin,
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
    path: '/dashboard',
    name: 'dashboard',
    component: AdminHomeView
  },
  {
    path: '/schedule',
    children: [
      {
        path: 'crew/update/:gameId',
        name: 'updateCrewSchedule',
        component: UpdateCrewSchedule,
        props: route => ({
          gameId: route.params.gameId,
          isNew: route.query.isNew === 'true'
        })
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
    component: CrewMembersView,
    children: [
      {
        path: 'manage',
        name: 'manageCrewMember',
        component: ManageCrewMember
      },
      {
        path: 'invite',
        name: 'addCrewMember',
        component: InviteCrewMember
      }
    ]
  },
  {
    path: '/register',
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
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
