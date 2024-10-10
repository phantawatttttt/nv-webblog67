<template>
  <div>
    <div class="nv-navbar">
      <img src="@/assets/logoo.png"alt="Logo" class="logo" />
      <ul class="nav">
        <li><router-link :to="{ name: 'blogs' }">Blogs</router-link></li>
        <li><router-link :to="{ name: 'users' }">Users</router-link></li>
        <li><router-link :to="{ name: 'comments' }">Comments</router-link></li>
        <!-- if isLogin is true, show logout menu. otherwise, show login menu-->
        <li><router-link :to="{ name: 'login' }">Login</router-link></li>  
      </ul>
    </div>
  </div>
</template>
<script>

export default {

  methods:{
    isLogin(){
      return this.$store.getters.isUserLoggedIn;
    },
    logout(){
      this.$store.dispatch('logout');
      this.$router.push({name: 'login'});
    }
  }
};
</script>
<style scoped>
.nv-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between; /* จัดตำแหน่งไปทางขวา */
  background-color: #316729; /* ปรับสีพื้นหลังตามที่ต้องการ */
  padding: 10px 20px;
}
.logo {
  width: 20px; /* ขนาดโลโก้ */
  height: 30px;
}
.nv-navbar .nav {
  list-style: none;
  margin: 0;
  padding: 0;
  float: left;
}
.logo {
  width: 50px; /* ขยายเต็มความกว้างของแถบเมนู */
  height: 50px;/* ขยายเต็มความสูงของแถบเมนู */
  object-fit: cover; 
}
.nv-navbar .nav li {
  float: left;
}
.nv-navbar .nav li a {
  padding: 10px;
  text-decoration: none;
  color: rgb(255, 255, 255);
  font-weight: bold;
}
.nv-navbar .nav li a:hover {
  padding: 10px;
  text-decoration: none;
  color: darkslategrey;
}
.nv-navbar .nav li a.router-link-active {
  background-color: #82B055;
  color: darkslategrey;
}
.clearfix {
  clear: left;
}
</style>
