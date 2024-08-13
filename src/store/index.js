import {defineStore}  from 'pinia';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';



export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    posts: null,
    role:null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    statePosts: (state) => state.posts,
    stateUser: (state) => state.user,
    isAdmin: (state) => state.role === 'admin',
    isUser: (state) => state.role === 'user'
  },

  actions: {
    async register(form) {
      try{
        const response = await axios.get("/api/check-user",{
          params: {userName: form.userName}
        })
        
        if(response.data.exists){
          throw new Error('User already exists');
        }else{  
          const response = await axios.post(`/api/sign-up`, {
              userName: form.userName,
              password: form.password,
              fullName: form.fullName,
             }
           )
           return response
         }
      }catch(error){
        console.error("Failed to register ", error)
      }
    },

    async logIn(form) {
      try{
        const response = await axios.post('/api/log-in', {
          userName: form.userName,
          password: form.password,
        });
  
        this.user = response.data.userName
        this.token = response.data.token;

        const decodedToken = jwtDecode(this.token);
        this.role = decodedToken.role;

        return response

      }catch(error){
        console.error("Failed to log in ", error)
      }
    },

    logOut() {
      this.user = null;
      this.posts = null;
      this.token = null;
      this.role = null;
    },

    async createPost(post) {
      try{
        const response = await axios.post('/api/create-posts', {
          title: post.title,
          content: post.content,
          author: this.user
        }, {
          headers:{"authorization":this.token}
        });

         return response

      }catch(error){
        console.error("Failed to create post", error)
      }
    },

    async getPosts() {
      try{
        const response = await axios.get('/api/get-posts', {
          headers:{"authorization":this.token}
        });

        this.posts = response.data.posts 

      }catch(error){
        console.error("Failed to fetch posts",error)
      }
    },

    async deletePost(id){

      try{
        const response = await axios.delete(`/api/delete-posts`, {
          data: { id: id }, 
          headers:{"authorization":this.token}
        })
        //await this.getPosts()
        return response

      }catch(error){
        console.error(error)
      }
    }

  },
  persist: true
});
