<template>
    <div>
        <h2>วิธีการปลูกต้นไม้</h2>
        <p><button v-on:click="logout">Logout</button></p>
        <h4>จำนวน blog {{blogs.length}}</h4>
        <p><button class="btn success" v-on:click="navigateTo('/blog/create')">สร้าง blog</button></p>
        <div id="templatemo_content_new">
            <div v-for="blog in blogs" v-bind:key="blog.id" class="thumbnail_270">

                <!-- แสดงรูปภาพ Thumbnail -->
                <transition name="fade">
                <div class="thumbnail-pic" v-if="blog.thumbnail && blog.thumbnail !== 'null'">
                    <a :href="'/blog/' + blog.id">
                        <img :src="BASE_URL + blog.thumbnail" :alt="blog.treeName" :title="blog.treeName" border="0" width="360" height="360" />
                    </a>
                </div>
                </transition>
    
                <!-- ชื่อบล็อก -->
                <h2>
                <a :href="'/blog/' + blog.id" :title="blog.treeName">{{ blog.treeName }}</a>
                </h2>

                <!-- รายละเอียดเพิ่มเติม -->
                <div class="blog-details">
                    <p>id: {{ blog.id }}</p>
                    <p>Tree Name: {{ blog.treeName }}</p>
                    <p>Category: {{ blog.category }}</p>
                    <p>Soil Type: {{ blog.soilType }}</p>
                    <p>Fertilizer Type: {{ blog.fertilizerType }}</p>
                </div>

                <!-- คำอธิบายหรือเนื้อหาของบล็อก -->
                <div class="tn_desc">
                    <p>{{ blog.description || 'No description available.' }}</p>
                </div>
    
                <!-- ปุ่มการกระทำ -->
                <p class="actions">
                    <button v-on:click="navigateTo('/blog/' + blog.id)">ดู blog</button>
                    <button class="btn warning" v-on:click="navigateTo('/blog/edit/' + blog.id)">แก้ไข blog</button>
                    <button class="btn danger" v-on:click="deleteBlog(blog)">ลบ blog</button>
                </p>

                <hr>
            </div>
        </div>
    </div>
</template>
<script>
import BlogsService from '@/services/BlogsService'
export default {
    data () {
        return {
            blogs: [],
            BASE_URL: 'http://localhost:8081/assets/uploads/' // ตั้งค่า BASE_URL ให้ถูกต้อง
        }
    },
    async created () {
        this.blogs = (await BlogsService.index()).data
    },
    methods: {
        logout () {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setBlog', null)
            this.$router.push({
                name: 'login'
            })
        },
        navigateTo (route) {
            this.$router.push(route)
        },
        async deleteBlog (blog) {
            let result = confirm("ต้องการลบสินค้านี้หรือไม่?")
            if (result) {
                try {
                    await BlogsService.delete(blog)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData() {
            this.blogs = (await BlogsService.index()).data
        }
    }
}
</script>
<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2, h4 {
    text-align: center;
    color: #333;
}

.thumbnail_270 {
    line-height: 1.7em;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 12px;
    float: left;
    position: relative;
    background-color: #F4F4F4;
    border-bottom: 3px solid #e4e4e4;
    border-bottom-right-radius: 24px;
    margin: 20px 2.2% 20px 0px;
    width: 70%;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.thumbnail_270:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.thumbnail-pic img {
    width: 100%;
    max-width: 360px;
    height: auto;
    border-radius: 4px;
    margin-bottom: 15px;
}

.blog-card {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-details {
    margin-bottom: 15px;
    color: #555;
}

.actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}

.btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn.primary {
    background-color: #3498db;
    color: #fff;
}

.btn.primary:hover {
    background-color: #2980b9;
}

.btn.success {
    background-color: #2ecc71;
    color: #fff;
}

.btn.success:hover {
    background-color: #27ae60;
}

.btn.warning {
    background-color: #f39c12;
    color: #fff;
}

.btn.warning:hover {
    background-color: #e67e22;
}

.btn.danger {
    background-color: #e74c3c;
    color: #fff;
}

.btn.danger:hover {
    background-color: #c0392b;
}

hr {
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 20px 0;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
