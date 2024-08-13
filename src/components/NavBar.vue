<script setup>

import {computed} from 'vue'
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';

const auth = useAuthStore()
const router = useRouter()

const isLoggedIn = computed(() => auth.isAuthenticated)


const authStore = useAuthStore()

const logOut = () => {
  
   authStore.logOut()
   router.push("/")

}


//console.log(import.meta.env.VITE_API_URL)
</script>

<template>
    <div id="nav">
      <RouterLink to="/" >Home</RouterLink>  
      
      <span v-if="isLoggedIn">
        <RouterLink to="/accounts/profile">Profile</RouterLink>
        <RouterLink to="/" @click="logOut">Logout</RouterLink>
        
      </span>

      <span v-else>
       <RouterLink to="/accounts/register"> Register</RouterLink> 
       <RouterLink to="/accounts/login">Login</RouterLink>
      </span>

    </div>
</template>