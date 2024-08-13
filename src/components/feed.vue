<script setup>

import {useAuthStore} from "@/store"
import { onMounted, computed, reactive} from "vue";
import Post from "@/components/post.vue"

const auth = useAuthStore()

const user = computed(() => auth.stateUser )
const posts = computed(() => auth.statePosts)



const form = reactive({
    title: '',
    content: ''
})



const submit = async () => {

    if(!form.title || !form.content){
        alert("All Fields are required")
        return
    }

    try {
        const response = await auth.createPost({
            title: form.title,
            content: form.content
        })
        
        if(response.status === 201){
          form.title = ''
          form.content = ''
          await auth.getPosts()
        }
    } catch (error) {
        console.error(error)
    }

}

onMounted(async ()=>{ 
 await auth.getPosts()
})

</script>

<template>
    <div class="posts">
        <div v-if="user">
          <p>Hi {{user}}</p>
        </div>
        <div>
            <form @submit.prevent="submit">
              <div>
                <label for="title">Title:</label>
                <input type="text" name="title" v-model="form.title">
              </div>
              <div>
                <textarea name="content" v-model="form.content" placeholder="Write up..."></textarea>
              </div>
              <button type="submit"> Submit</button>
            </form>
        </div>
        <div v-if="posts">
          <Post :posts="posts"/>
        </div>
        <div v-else>
          Oh no!!! We have no posts
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
  border:0;
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius:30px;
  margin: 10px;
}
button[type=submit]:hover {
  background-color: #45a049;
}
input {
  width:60%;
  margin: 15px;
  border: 0;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
  padding:10px;
  border-radius:30px;
}
textarea {
  width:75%;
  resize: vertical;
  padding:15px;
  border-radius:15px;
  border:0;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
  height:150px;
  margin: 15px;
}
</style>

  