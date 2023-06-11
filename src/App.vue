<script>
import navigator from './components/theHeader.vue'

export default {
  components: {
    navigator,

  },
  data() {
    return {
      uploadedImage: null,
    }
  },
  methods: {
    showPageIndex() {
      // 输出现在的页面索引
      console.log(this.$refs.nav.nowPage);
    },
    handleUpload(event) {
      console.log("用户上传图片回调");
      const file = event.target.files[0];

      if (file) {
        // console.log("文件存在");
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
  computed: {
    showimg() {
      return this.isUpload ? this.uploadedImage : "img/uploadImgPlaceholder-removebg-preview.png";
    },
  }
}
</script>

<template>
  <v-app>
    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6">
          <label for="upload" class="upload-label">
            <v-img
                v-if="!uploadedImage"
                src="img/uploadImgPlaceholder-removebg-preview.png"
                width="100%"
                aspect-ratio="1"
                contain
            ></v-img>
            <v-img
                v-else
                :src="uploadedImage"
                width="100%"
                aspect-ratio="1"
                contain
            ></v-img>
            <input
                id="upload"
                type="file"
                accept="image/*"
                style="display: none"
                @change="handleUpload"
            />
          </label>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <!--        TODO 点击上传之后的回调-->
        <v-btn @click="showPageIndex">上传</v-btn>
      </v-row>
    </v-container>

<!--    <v-btn @click="showimg">img</v-btn>-->
    <navigator ref="nav"/>
  </v-app>

</template>

<style>
button, a {
  display: block;
  margin-bottom: 1em;
}
</style>