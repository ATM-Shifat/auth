<script setup>

import { useAuthStore } from '@/store';
import {reactive} from 'vue'
import { useRouter } from 'vue-router';

const auth = useAuthStore()
const router = useRouter()

const form = reactive({
  userName: '',
  password: ''
})

const state = reactive({
    state: false
})

const submit = async () => {
    if (!form.userName ||!form.password) {
      alert('Please fill all fields');
      return;
    }
    try {
      const response = await auth.logIn({
        userName: form.userName, 
        password: form.password
      });
      if(response.status === 200)
        router.push('/');
    } catch (error) {
      console.error(error);
      state.showError = true;
    }
  
}

</script>

<template>
    <div class="login">
      <div>
        <form @submit.prevent="submit">
          <div>
            <label for="username">Username:</label>
            <input type="text" name="username" v-model="form.userName" />
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" name="password" v-model="form.password" />
          </div>
          <button type="submit">Submit</button>
        </form>
        <p v-if="state.showError" id="error">Username or Password is incorrect</p>
      </div>
    </div>
  </template>

<style scoped>
* {
  box-sizing: border-box;
}
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
button[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius:30px;
}
button[type=submit]:hover {
  background-color: #45a049;
}
input {
  margin: 5px;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
  padding:10px;
  border-radius:30px;
}
#error {
  color: red;
}
</style>
