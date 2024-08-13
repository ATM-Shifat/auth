<script setup>

import { defineProps } from 'vue';
import { useAuthStore } from '@/store';
import { computed } from 'vue';

const auth = useAuthStore()
const user = computed(()=> auth.stateUser)


defineProps({
    posts: {
      type: Array,
      required: true
    }
})


const deletePost = async(post) => {
 
        try{
            await auth.deletePost (post.id)
            //if(response.status === 200 || response.status === 304){
              await auth.getPosts()
            //}
        }catch(error){
            console.error("Failed to delete post")
        }
    

}

const owner = (post)=>{
  return user.value === post.author;
}

</script>

<template>
    <div class="posts" v-if="posts">
          <ul>
            <li v-for="post in posts" :key="post.id">
              <div id="post-div">
                  <p>{{post.title}} </p>
                  <p>{{post.content}}</p>
                  <p>Written By: {{post.author}}</p>
                <button v-if="owner(post)"  @click="deletePost(post)">delete</button>
              </div>
            </li>
          </ul>
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
button {
  border: 0px;
  background-color: #4CAF50;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  border-radius:30px;
  margin: 10px;
}
button:hover {
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
ul {
  list-style: none;
}
#post-div {
  border: 3px solid #278d2f;
  border-radius:10px;
  width: 500px;
  margin: auto;
  margin-bottom: 5px;
  padding:10px;
}
</style>
