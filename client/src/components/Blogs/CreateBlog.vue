<template>
  <div class="Create-Blog">
  <div>
    <h1>Create Blog</h1>
  
    <form v-on:submit.prevent="createBlog" class ="createblog">
      <div class="form-group">
        Tree Name:
        <input type="text" v-model="blog.treeName" required />
      </div>
      <transition name="fade">
        <div class="thumbnail-pic" v-if="blog.thumbnail !== 'null'">
          <img :src="BASE_URL + blog.thumbnail" alt="thumbnail" />
        </div>
      </transition>
      <div enctype="multipart/form-data" novalidate>
        <div class="dropbox">
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="handleFileChange($event.target.files)"
            accept="image/*"
            class="input-file"
          />
          <p v-if="isInitial">
            Drag your file(s) here to begin<br />
            or click to browse
          </p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
          <p v-if="isSuccess">Upload Successful.</p>
        </div>
      </div>
      <div>
        <transition-group tag="ul" class="pictures">
          <li v-for="picture in pictures" :key="picture.id">
            <img
              style="margin-bottom: 5px"
              :src="BASE_URL + picture.name"
              alt="picture image"
            />
            <br />
            <button v-on:click.prevent="useThumbnail(picture.name)">
              Thumbnail
            </button>
            <button v-on:click.prevent="delFile(picture)">Delete</button>
          </li>
        </transition-group>
        <div class="clearfix"></div>
      </div>
      <p>
        category:
        <input type="text" v-model="blog.category" />
      </p>
      <p>
        Soil Type:
        <select v-model="blog.soilType" required>
          <option value="sand">ดินทราย</option>
          <option value="clay">ดินเหนียว</option>
          <option value="loam">ดินร่วน</option>
        </select>
      </p>
      <p>
        Fertilizer Type:
        <select v-model="blog.fertilizerType" required>
          <option value="15-15-15">สูตร 15-15-15</option>
          <option value="18-20-0">สูตร 18-20-0</option>
          <option value="46-0-0">สูตร 46-0-0</option>
          <option value="13-13-21">สูตร 13-13-21</option>
          <option value="10-20-10">สูตร 10-20-10</option>
          <option value="18-6-12">สูตร 18-6-12</option>
        </select>
      </p>
      <p>
        <button type="submit">create blog</button>
      </p>
    </form>
  </div>
</div>
</template>
<script>
import BlogsService from "@/services/BlogsService";
import VueCkeditor from "vue-ckeditor2";
import UploadService from "../../services/UploadService";
 
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;
 
export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,
      blog: {
        pname: "",
        thumbnail: "null",
        pictures: "null",
        detail: "",
        price: "",
        num: "",
      },
      config: {
        toolbar: [
          ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript"],
        ],
        height: 300,
      },
    };
  },
  methods: {
    async delFile(material) {
      let result = confirm("Want to delete?");
      if (result) {
        let dataJSON = {
          filename: material.name,
        };
 
        await UploadService.delete(dataJSON);
        this.pictures = this.pictures.filter(p => p.id !== material.id);
      }
    },
    async createBlog() {
      this.blog.pictures = JSON.stringify(this.pictures);
      console.log("JSON.stringify: ", this.blog);
      try {
        await BlogsService.post(this.blog);
        this.$router.push({ name: "blogs" });
      } catch (err) {
        console.log(err);
      }
    },
    handleFileChange(fileList) {
      const formData = new FormData();
      if (!fileList.length) return;
      Array.from(fileList).forEach(file => {
        formData.append(this.uploadFieldName, file, file.name);
        this.uploadedFileNames.push(file.name);
      });
      this.save(formData);
    },
    async save(formData) {
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;
        this.updatePictures();
        this.clearUploadResult();
      } catch (error) {
        console.log(error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    updatePictures() {
      this.uploadedFileNames.forEach((uploadFilename) => {
        if (!this.pictures.some(p => p.name === uploadFilename)) {
          this.pictureIndex++;
          this.pictures.push({
            id: this.pictureIndex,
            name: uploadFilename,
          });
        }
      });
    },
    clearUploadResult() {
      setTimeout(() => {
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFileNames = [];
      }, 5000);
    },
    useThumbnail(filename) {
      this.blog.thumbnail = filename;
    },
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },
  components: {
    VueCkeditor,
  },
  created() {
    this.currentStatus = STATUS_INITIAL;
  },
};
</script>
 
<style scoped>
.Create-Blog {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background: linear-gradient(145deg, #f0f0f0, #dcdcdc);
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
  transition: transform 0.3s ease-in-out;
}
.Create-Blog:hover {
  transform: scale(1.05);
}

.createblog .form-group {
  margin-bottom: 20px;
  text-align: left;
  position: relative;
}

.createblog .form-group label {
  position: absolute;
  top: -10px;
  left: 10px;
  background: #fff;
  padding: 0 5px;
  font-size: 12px;
  color: #777;
}

.createblog input, .createblog select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.createblog input:focus, .createblog select:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 4px 12px rgba(50, 152, 219, 0.4);
}

.dropbox {
  outline: 2px dashed #bbb;
  outline-offset: -10px;
  background: linear-gradient(145deg, #fff9e0, #ffe8b3);
  color: #555;
  padding: 20px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.dropbox:hover {
  background: linear-gradient(145deg, #ffecb3, #ffdf80);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 60px 0;
  color: #333;
  opacity: 0.8;
}

ul.pictures {
  list-style: none;
  padding: 0;
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

ul.pictures li {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

ul.pictures li:hover {
  transform: scale(1.08);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

ul.pictures li img {
  max-width: 100%;
  display: block;
  border-radius: 10px;
}

.thumbnail-pic img {
  width: 250px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.thumbnail-pic img:hover {
  transform: rotate(3deg) scale(1.02);
}

button {
  background: linear-gradient(145deg, #3498db, #2980b9);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease, transform 0.2s ease;
}

button:hover {
  background: linear-gradient(145deg, #2980b9, #216fa6);
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

.clearfix {
  clear: both;
}

/* Animation for fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>