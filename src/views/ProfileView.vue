<script setup>

import { useAuthStore } from '@/store';
import {reactive, computed, onMounted } from 'vue'
import {useRouter} from 'vue-router'
import Post from '@/components/post.vue';

const auth = useAuthStore()

const user = computed(() => auth.stateUser)
const posts = computed(()=>auth.statePosts)
const userPosts = computed(()=> posts.value? posts.value.filter((post)=>post.author === user.value) : null)




onMounted(async ()=>{
    await auth.getPosts()
})

</script>

<template>
 <div>
   <h1>User Profile</h1>
    <p>Welcome, {{ user }}</p>
    <span v-if="userPosts" >
      <p>Total Posts: {{ userPosts.length }}</p>
      <p>Posts:</p>
      <Post :posts="userPosts"/>
    </span>
 
 </div>
</template>