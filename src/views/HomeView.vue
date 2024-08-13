<script setup>

import {useAuthStore} from "@/store"
import {computed, reactive} from "vue"
import {useRoute} from "vue-router"

import Feed from "@/components/feed.vue"

const auth = useAuthStore()


const user = computed(()=> auth.stateUser)

</script>

<template>
  <div class="home">
  <Feed v-if="user"/>
  <h1 v-else> Welcome to the blog</h1>
  </div>
</template>

