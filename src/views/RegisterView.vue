<script setup>

import { useAuthStore } from '@/store';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
    userName: '',
    fullName: '',
    password: '',
})
const auth = useAuthStore()

const submit = async() => {
  if (!form.userName ||!form.fullName ||!form.password) {
    alert('Please fill all fields');
    return;
  }
    try {
        const response = await auth.register({
          userName: form.userName, 
          fullName: form.fullName, 
          password: form.password
        });
        if(response.status === 201)
          router.push('/accounts/login')
    } catch (error) {
        console.error(error)
    }
}

</script>

<template>
    <div class="register">
        <div>
            <form @submit.prevent="submit">
              <div>
                <label for="userName">Username:</label>
                <input type="text" name="username" v-model="form.userName">
              </div>
              <div>
                <label for="fullName">Full Name:</label>
                <input type="text" name="fullName" v-model="form.fullName">
              </div>
              <div>
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="form.password">
              </div>
              <button type="submit"> Submit</button>
            </form>
        </div>
        <!-- <p v-if="showError" id="error">Username already exists</p> -->
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
