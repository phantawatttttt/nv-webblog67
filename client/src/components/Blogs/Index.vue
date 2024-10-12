<template>
    <div>
        

        <h1>วิธีการปลูกต้นไม้</h1>
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
                    <p>Tree Name: {{ blog.treeName }}</p>
                    <p>Category: {{ blog.category }}</p>
                    <p>Soil Type: {{ blog.soilType }}</p>
                    <p>Fertilizer Type: {{ blog.fertilizerType }}</p>
                </div>

                
    
                <!-- ปุ่มการกระทำ -->
                <p class="actions">
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
    max-width: 1000px;
    margin: 30px auto;
    padding: 30px;
    background-color: #f8f9fa;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.container:hover {
    transform: scale(1.03);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

h1, h4 {
    text-align: center; /* จัดให้อยู่ตรงกลาง */
    color: #ece5ce; /* ตั้งค่าสีเป็นสีขาว */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-bottom: 25px;
    text-transform: uppercase;
    letter-spacing: 1.2px;
}


.thumbnail_270 {
    font-family: 'Segoe UI', Tahoma, sans-serif;
    font-size: 14px;
    float: left;
    position: relative;
    background: linear-gradient(145deg, #608555, #eeeeee);
    border-bottom: 5px solid #6fdb7e;
    border-radius: 15px;
    margin: 20px 1%;
    width: 28%;
    padding: 25px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    text-align: center;
}
.thumbnail_270:hover {
    transform: translateY(-10px) rotate(1deg);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
    background: linear-gradient(145deg, #f1f1f1, #dcdcdc);
}

.thumbnail-pic {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;
}
.thumbnail-pic img {
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.thumbnail-pic img:hover {
    transform: scale(1.08);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.blog-details {
    color: #555;
    font-size: 14px;
    margin-bottom: 20px;
    line-height: 1.5em;
}

.actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
}

.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
}
.btn:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}
.btn.primary {
    background: linear-gradient(145deg, #3498db, #2980b9);
    color: #fff;
}
.btn.primary:hover {
    background: linear-gradient(145deg, #2980b9, #216fa6);
}
.btn.success {
    background: linear-gradient(145deg, #2ecc71, #27ae60);
    color: #fff;
}
.btn.success:hover {
    background: linear-gradient(145deg, #27ae60, #219150);
}
.btn.warning {
    background: linear-gradient(145deg, #f39c12, #e67e22);
    color: #fff;
}
.btn.warning:hover {
    background: linear-gradient(145deg, #e67e22, #d35400);
}
.btn.danger {
    background: linear-gradient(145deg, #e74c3c, #c0392b);
    color: #fff;
}
.btn.danger:hover {
    background: linear-gradient(145deg, #c0392b, #a93226);
}

hr {
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 25px 0;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.6s, transform 0.4s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

</style>
