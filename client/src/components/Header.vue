<template>
  <div>
    <div class="nv-navbar">
      <img src="@/assets/logoo.png" alt="Logo" class="logo" />
      <ul class="nav">
        <li><router-link :to="{ name: 'blogs' }">Home</router-link></li>
        <li><router-link :to="{ name: 'users' }">Users</router-link></li>
        
        <!-- แสดงทั้ง Login และ Logout -->
        <li>
          <router-link :to="{ name: 'login' }">Login</router-link>
        </li>
        <li>
          <!-- ใช้ router-link สำหรับ Logout แต่เพิ่ม @click เพื่อเรียกใช้ฟังก์ชัน logout -->
          <router-link :to="{ name: 'login' }" @click.native="logout">Logout</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      // ทำการ logout โดยลบ token และข้อมูล blog จาก store
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setBlog', null);
      // ไม่มีความจำเป็นในการใช้ this.$router.push เนื่องจาก router-link จะจัดการให้เอง
    },
  },
};
</script>

<style scoped>
/* Navbar Styling */
.nv-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #82B055; /* สีเขียวเข้มเพื่อธีมต้นไม้ */
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Logo Styling */
.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

/* Navbar Menu Styling */
.nv-navbar .nav {
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 0;
  padding: 0;
}

/* Navbar Menu Item Styling */
.nv-navbar .nav li {
  position: relative;
}

.nv-navbar .nav li a {
  padding: 10px 15px;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  transition: background 0.3s ease, color 0.3s ease;
}

/* Hover Effect for Links */
.nv-navbar .nav li a:hover {
  background-color: #66bb6a; /* สีเขียวอ่อน */
  color: #1b5e20; /* สีเขียวเข้ม */
}

/* Active Link Styling */
.nv-navbar .nav li a.router-link-active {
  background-color: #a5d6a7; /* สีเขียวอ่อน */
  color: #004d40; /* สีเขียวเข้ม */
}

/* Clearfix for Floating */
.clearfix {
  clear: both;
}
</style>
