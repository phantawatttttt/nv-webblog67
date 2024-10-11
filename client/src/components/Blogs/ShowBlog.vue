<template>
    <div class="card">
        <div v-if="blog">
            <transition name="fade">
                <div v-if="blog.thumbnail && blog.thumbnail !== 'null'" class="thumbnail-pic">
                    <img :src="BASE_URL + blog.thumbnail" :alt="blog.treeName" :title="blog.treeName" />
                </div>
                <p v-else>ไม่พบภาพ</p>
            </transition>
            <h2>{{ blog.treeName.toUpperCase() }}</h2>
            <p>Tree Name: {{ blog.treeName }}</p>
            <p>Category: {{ blog.category }}</p>
            <p>Soil Type: {{ blog.soilType }}</p>
            <p>Fertilizer Type: {{ blog.fertilizerType }}</p>
            <div class="actions">
                <button class="btn warning" v-on:click="navigateTo('/blog/edit/' + blog.id)">แก้ไข BLOG</button>
                <button class="btn danger" v-on:click="deleteBlog(blog)">ลบ BLOG</button>
            </div>
        </div>
        <div v-else>
            <p>กำลังโหลดข้อมูล...</p>
        </div>
    </div>
</template>


<script>
import BlogsService from '@/services/BlogsService'

export default {
    data() {
        return {
            blog: null,
            BASE_URL: 'http://localhost:8081/assets/uploads/' // ตั้งค่า BASE_URL ให้ถูกต้อง
        }
    },
    async created() {
        try {
            const blogId = this.$route.params.blogId
            this.blog = (await BlogsService.show(blogId)).data
            console.log('Pictures:', this.blog.pictures) // ตรวจสอบว่ามีรูปภาพหรือไม่
        } catch (error) {
            console.error('ไม่สามารถโหลดข้อมูลบล็อก:', error)
        }
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route)
        }
    }
}
</script>

<style scoped>
/* Card Styling */
.card {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

/* Image Styling */
.thumbnail-pic {
    width: 100%;
    overflow: hidden;
    border-radius: 15px;
    margin-bottom: 20px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
.thumbnail-pic img {
    width: 100%;
    height: auto;
    border-radius: 15px;
    transition: transform 0.3s ease;
}
.thumbnail-pic:hover img {
    transform: scale(1.05);
}

/* Text Styling */
.card h2 {
    font-size: 1.8em;
    color: #4a4a4a;
    margin-bottom: 10px;
    text-transform: uppercase;
    font-weight: bold;
}
.card p {
    font-size: 1em;
    color: #777;
    line-height: 1.6;
    margin-bottom: 20px;
}

/* Button Styling */
.actions {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}
.btn {
    padding: 12px 30px;
    border: none;
    border-radius: 30px;
    font-size: 1em;
    cursor: pointer;
    color: #fff;
    transition: background 0.3s ease, transform 0.3s ease;
    font-weight: bold;
    text-transform: uppercase;
}
.btn.warning {
    background: linear-gradient(145deg, #f39c12, #e67e22);
}
.btn.warning:hover {
    background: linear-gradient(145deg, #e67e22, #d35400);
    transform: translateY(-3px);
}
.btn.danger {
    background: linear-gradient(145deg, #e74c3c, #c0392b);
}
.btn.danger:hover {
    background: linear-gradient(145deg, #c0392b, #a93226);
    transform: translateY(-3px);
}


</style>
