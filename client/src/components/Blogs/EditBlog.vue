<template>
  <div class="container">
    <h1>Edit Blog</h1>
    <form v-on:submit.prevent="editBlog">
      <p>
        Tree Name:
        <input type="text" v-model="blog.treeName" />
      </p>
      <transition name="fade">
        <div class="thumbnail-pic" v-if="blog.thumbnail != 'null'">
          <img :src="BASE_URL + blog.thumbnail" alt="thumbnail" />
        </div>
      </transition>
      <form enctype="multipart/form-data" novalidate>
        <div class="dropbox">
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
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
      </form>
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
      
      <p>Category: <input type="text" v-model="blog.category" /></p>
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
        </select>
      </p>
      <p>
        <button type="submit">Update Blog</button>
        <button v-on:click="navigateTo('/blogs')">Back</button>
      </p>
    </form>
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
  components: { VueCkeditor },
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      // uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,
      blog: {
        treeName: "",
        thumbnail: "null",
        pictures: "null",
        soilType: "",
        category: "",
        fertilizerType: "",
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
        for (var i = 0; i < this.pictures.length; i++) {
          if (this.pictures[i].id === material.id) {
            this.pictures.splice(i, 1);
            this.materialIndex--;
            break;
          }
        }
      }
    },
    async editBlog() {
      try {
        await BlogsService.put(this.blog);
        this.$router.push({
          name: "blogs",
        });
      } catch (err) {
        console.log(err);
      }
    },
    onBlur(editor) {
      console.log(editor);
    },
    onFocus(editor) {
      console.log(editor);
    },
    navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },
    wait(ms) {
      return (x) => {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
      };
    },
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      // this.uploadedFiles = []
      this.uploadError = null;
      this.uploadedFileNames = [];
    },
    async save(formData) {
      // upload data to the server
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;

        // update image uploaded display
        let pictureJSON = [];
        this.uploadedFileNames.forEach((uploadFilename) => {
          let found = false;
          for (let i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].name == uploadFilename) {
              found = true;
              break;
            }
          }
          if (!found) {
            this.pictureIndex++;
            let pictureJSON = {
              id: this.pictureIndex,
              name: uploadFilename,
            };
            this.pictures.push(pictureJSON);
          }
        });
        this.clearUploadResult();
      } catch (error) {
        console.log(error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();
      if (!fileList.length) return;
      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });
      // save it
      this.save(formData);
    },
    clearUploadResult: function () {
      setTimeout(() => this.reset(), 5000);
    },
    useThumbnail(filename) {
      console.log(filename);
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
  async created() {
    this.currentStatus = STATUS_INITIAL;
    this.config.toolbar = [
      {
        name: "document",
        items: [
          "Source",
          "-",
          "Save",
          "NewPage",
          "Preview",
          "Print",
          "-",
          "Templates",
        ],
      },
      {
        name: "clipboard",
        items: [
          "Cut",
          "Copy",
          "Paste",
          "PasteText",
          "PasteFromWord",
          "-",
          "Undo",
          "Redo",
        ],
      },
      {
        name: "editing",
        items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"],
      },
      {
        name: "forms",
        items: [
          "Form",
          "Checkbox",
          "Radio",
          "TextField",
          "Textarea",
          "Select",
          "Button",
          "ImageButton",
          "HiddenField",
        ],
      },
      "/",
      {
        name: "basicstyles",
        items: [
          "Bold",
          "Italic",
          "Underline",
          "Strike",
          "Subscript",
          "Superscript",
          "-",
          "CopyFormatting",
          "RemoveFormat",
        ],
      },
      {
        name: "paragraph",
        items: [
          "NumberedList",
          "BulletedList",
          "-",
          "Outdent",
          "Indent",
          "-",
          "Blockquote",
          "CreateDiv",
          "-",
          "JustifyLeft",
          "JustifyCenter",
          "JustifyRight",
          "JustifyBlock",
          "-",
          "BidiLtr",
          "BidiRtl",
          "Language",
        ],
      },
      { name: "links", items: ["Link", "Unlink", "Anchor"] },
      {
        name: "insert",
        items: [
          "Image",
          "Flash",
          "Table",
          "HorizontalRule",
          "Smiley",
          "SpecialChar",
          "PageBreak",
          "Iframe",
          "InsertPre",
        ],
      },
      "/",
      { name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
      { name: "colors", items: ["TextColor", "BGColor"] },
      { name: "tools", items: ["Maximize", "ShowBlocks"] },
      { name: "about", items: ["About"] },
    ];

    try {
      let blogId = this.$route.params.blogId;
      this.blog = (await BlogsService.show(blogId)).data;
      this.pictures = JSON.parse(this.blog.pictures);
      this.pictureIndex = this.pictures.length;
    } catch (error) {
      console.log(error);
    }
  },
  async mounted() {
    try {
      let blogId = this.$route.params.blogId;
      this.blog = (await BlogsService.show(blogId)).data;
      this.pictures = JSON.parse(this.blog.pictures);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style scoped>
/* Container Styling */
.container {
  max-width: 900px;
  margin: 50px auto;
  padding: 40px;
  background: linear-gradient(145deg, #e0ffe0, #d0e6d0);
  border-radius: 25px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  text-align: center;
  position: relative;
}

/* Header Styling */
h1 {
  font-size: 2.8em;
  color: #2e7d32;
  margin-bottom: 35px;
  font-weight: bold;
  position: relative;
}

/* Card Styling */
.card {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin-bottom: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Input Field Styling */
input[type="text"], select {
  width: 100%;
  padding: 14px;
  margin-bottom: 20px;
  border: 2px solid #81c784;
  border-radius: 15px;
  background: #f1f8e9;
}

/* Button Styling */
button {
  padding: 14px 25px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(145deg, #4caf50, #388e3c);
}

/* Thumbnail Styling */
.thumbnail-pic {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 100%; /* กำหนดขนาดสูงสุดให้พอดีกับ card */
    margin-bottom: 15px;
    overflow: hidden; /* ซ่อนส่วนที่เกินออกมาจาก card */
}

.thumbnail-pic img {
    width: 100%;
    max-width: 100%;
    height: auto;
    object-fit: cover; /* ตัดขอบรูปให้พอดีในกรณีที่รูปไม่พอดี */
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

</style>