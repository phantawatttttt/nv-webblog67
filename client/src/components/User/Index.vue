<template>
  <div class="container">
    <h1>Get All Users</h1>
    <hr>
    <div v-if="users.length" class="user-count">
      <div><b>จำนวนผู้ใช้งาน:</b> {{ users.length }}</div>
    </div>
    <div v-if="users.length">
      <div v-for="user in users" v-bind:key="user.id" class="user-card">
        <div class="user-detail"><b>ID:</b> {{ user.id }}</div>
        <div class="user-detail"><b>ชื่อผู้ใช้:</b> {{ user.name }} {{ user.lastname }}</div>
        <div class="user-detail"><b>อีเมล:</b> {{ user.email }}</div>
        <div class="user-detail"><b>Status:</b> {{ user.status }}</div>
        <div class="user-detail"><b>Type:</b> {{ user.type }}</div>
        <div class="button-group">
          <button v-on:click="navigateTo('/user/'+user.id)" class="btn-view">ดูข้อมูล</button>
          <button v-on:click="navigateTo('/user/edit/'+user.id)" class="btn-edit">แก้ไขข้อมูล</button>
          <button v-on:click="deleteUser(user)" class="btn-delete">ลบข้อมูล</button>
        </div>
        <hr>
      </div>
    </div>
    <div class="logout-button">
      <button v-on:click="logout" class="btn-logout">Logout</button>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
export default {
  data(){
    return {
      users: []
    }
  },
  async created() {
    try{
      this.users = (await UsersService.index()).data;
    }catch(err){
      console.log(err);
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('setToken',null)
      this.$store.dispatch('setUser',null)
      this.$router.push({
        name: 'login'
      })
    },
    navigateTo(route){
      this.$router.push(route);
    },
    async deleteUser(user){
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
      if(result){
        try{
          await UsersService.delete(user);
          this.refreshData();

        }catch(err){
          console.log(err);
        }
      }
    },
    async refreshData(){
      try{
        this.users = (await UsersService.index()).data;
      }catch(err){
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
/* Container styling */
.container {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background: #f0f8f0; /* สีพื้นหลังอ่อนๆ คล้ายสีใบไม้ */
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

/* User Card Styling */
.user-card {
  background: #e0ffe0; /* สีพื้นหลังอ่อนๆ แบบสีเขียว */
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  border: 2px solid #a3c293; /* สีเขียวเข้มของต้นไม้ */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.user-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

/* Header styling */
h1 {
  font-size: 2.2em;
  color: #3e8e41; /* สีเขียวเข้ม */
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

/* User Detail Styling */
.user-detail {
  margin-bottom: 10px;
  font-size: 1.1em;
  color: #4f7942; /* สีเขียวมะกอก */
}

.user-detail b {
  color: #2e7d32; /* สีเขียวเข้ม */
}

/* Button Styling */
button {
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  transition: background-color 0.3s, transform 0.2s ease;
}

.btn-view {
  background-color: #4caf50; /* สีเขียวแบบใบไม้ */
}

.btn-edit {
  background-color: #8bc34a; /* สีเขียวอ่อน */
}

.btn-delete {
  background-color: #795548; /* สีน้ำตาลเข้ม */
}

button:hover {
  transform: scale(1.05);
  background-color: #689f38; /* สีเขียวเข้มขึ้นเมื่อ hover */
}

/* Button Group Styling */
.button-group {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 15px;
}

/* Divider Styling */
hr {
  border: 0;
  border-top: 2px solid #a3c293; /* สีเขียวแบบธรรมชาติ */
  margin: 20px 0;
}

/* User Count Styling */
.user-count {
  font-size: 1.2em;
  margin-bottom: 20px;
  color: #2e7d32; /* สีเขียวเข้ม */
}

/* Logout Button Styling */
.logout-button {
  text-align: center;
  margin-top: 30px;
}

.btn-logout {
  background-color: #3e8e41; /* สีเขียวเข้ม */
}

/* Background Pattern */

</style>
