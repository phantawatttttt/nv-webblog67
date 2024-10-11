<template>
    <div>
        <h1>รายละเอียด</h1>
        <div v-if="blog">
            <p>ไอดี: {{ blog.id }}</p>
            <p>ชื่อต้นไม้: {{ blog.treeName }}</p>
            <p>ประเภท: {{ blog.category }}</p>
            <p>ประเภทดิน: {{ blog.soilType }}</p>
            <p>ประเภทปุ๋ย: {{ blog.fertilizerType }}</p>
            <p>รูปภาพ:</p>
            
            <!-- แสดงรูปภาพของบล็อก -->
            <transition name="fade">
    <div v-if="blog.thumbnail && blog.thumbnail !== 'null'" class="thumbnail-pic">
        <a :href="'/blog/' + blog.id">
            <img :src="BASE_URL + blog.thumbnail" :alt="blog.treeName" :title="blog.treeName" border="0" width="360" height="360" />
        </a>
    </div>
    <p v-else>ไม่พบภาพ</p>
</transition>
            <!-- ปุ่มการกระทำ -->
            <p class="actions">
                <button class="btn warning" v-on:click="navigateTo('/blog/edit/' + blog.id)">แก้ไขบล็อก</button>
                <button class="btn primary" v-on:click="navigateTo('/blogs')">กลับไปที่บล็อก</button>
            </p>
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
.picture-container {
    margin-bottom: 10px;
}

.blog-picture {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
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

.btn.warning {
    background-color: #f39c12;
    color: #fff;
}

.btn.warning:hover {
    background-color: #e67e22;
}
</style>
