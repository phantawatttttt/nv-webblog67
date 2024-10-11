<template>
  <div class="container">
    <h1>Show User</h1>
    <div class="user-card">
      <p><b>ID:</b> {{ user.id }}</p>
      <p><b>Name:</b> {{ user.name }}</p>
      <p><b>Lastname:</b> {{ user.lastname }}</p>
      <p><b>Email:</b> {{ user.email }}</p>
      <p><b>Password:</b> {{ user.password }}</p>
      <p><b>Status:</b> {{ user.status }}</p>
      <p><b>Type:</b> {{ user.type }}</p>
      <p><b>Created At:</b> {{ new Date(user.createdAt).toLocaleDateString() }}</p>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";

export default { 
  data(){
    return {
      user: {}
    }
  },
  async created() {
    try {
      var userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    } catch (err) {
      console.log(err);
    }
  }
}
</script>

<style scoped>
/* Container styling */
.container {
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
  background: #f0f8f0; /* Light green background for tree theme */
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

/* Header styling */
h1 {
  font-size: 2em;
  color: #3e8e41; /* Dark green */
  margin-bottom: 20px;
  text-align: center;
}

/* User Card Styling */
.user-card {
  background: #e0ffe0; /* Light green background */
  border-radius: 15px;
  padding: 20px;
  border: 2px solid #a3c293; /* Darker green border */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  font-size: 1.1em;
  color: #4f7942; /* Olive green text color */
  line-height: 1.6;
}

/* Paragraph Styling */
.user-card p {
  margin-bottom: 10px;
}

/* Bold text for labels */
.user-card b {
  color: #2e7d32; /* Dark green */
}
</style>
