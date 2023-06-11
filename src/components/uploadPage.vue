<script>
export default {
  data() {
    return {
      uploadedImage: null,

    }
  },
  methods: {
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
    submitUploadImg() {
      console.log("用户点击上传按钮");
      if (this.uploadedImage)
      {
        // TODO 上传图片回调

      }
    },
  },
}
</script>



<template>
      <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6">
          <label for="upload" class="upload-label">
            <v-img
                v-if="!uploadedImage"
                src="./img/uploadImgPlaceholder-removebg-preview.png"
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
        <v-btn @click="submitUploadImg">上传</v-btn>
      </v-row>
    </v-container>

</template>