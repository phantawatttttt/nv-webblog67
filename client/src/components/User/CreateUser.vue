<template>
  <div class="Create-User">
    <h1>Create User</h1>
    <form v-on:submit.prevent = "createUser" class ="createuser">
      <div class="form-group">
        <label for="name">name</label>
        <input
          type="text"
          id="name"
          name="name"
          v-model="user.name"
          required
        />
      </div>
      <div class="form-group">
        <label for="lastname">lastname</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          v-model="user.lastname"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="user.email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="user.password"
          required
        />
      </div>
      <div><button type="submit">create user</button></div>
    </form>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService';
export default {
  data(){
    return {
      user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        status: 'active'
      }
    }
  },
  methods:{
    async createUser(){
      try{
        await UsersService.post(this.user);
        this.$router.push('/users');
      }catch(err){
        console.log(err);
      }
      
    }
  }

}
</script>

<style>
.Create-User{
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
 
h1 {
  margin-bottom: 20px;
  color: #333;
}
 
.createuser .form-group {
  margin-bottom: 15px;
  text-align: left;
}
 
.createuser label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
 
.createuser input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}
 
.createuser input:focus {
  border-color: #3498db;
  outline: none;
}
 
.btn,
.btn-add-user {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}
 
.btn:hover,
.btn-add-user:hover {
  background-color: #2980b9;
}
 
.error {
  color: rgb(223, 19, 19);
  margin-top: 10px;
  font-size: 14px;
}
</style>