import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import RegistrationPage from '../views/RegistrationPage.vue';
import CameraPage from '../views/CameraPage.vue';
import LocationAccessUtilityPage from '../views/LocationAccessUtilityPage.vue';
import DeviceInfoPage  from '../views/DeviceInfoPage.vue';
import CheckDeviceConnectivity from '@/views/CheckDeviceConnectivity.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/registration'
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationPage
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path: '/camera',
    name: 'camera',
    component: CameraPage,
  },
  {path: '/location',
    name: 'location',
    component: LocationAccessUtilityPage,
  },
  {
    path: '/device-info',
    name: 'device-info',
    component: DeviceInfoPage,
  },

  {
    path: '/connection_check',
    name: 'connection check',
    component: CheckDeviceConnectivity
  }
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
