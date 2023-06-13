<script>
import uploadImgplaceholder from "./img/uploadImgPlaceholder-removebg-preview.png";

export default {
  props: ['backURL', "balanceURL"],
  data() {
    return {
      uploadedImage: uploadImgplaceholder,
      dialogVisible: false, // 控制弹窗的显示与隐藏
      user: this.$auth0.user,
      userBlessing: "",
      isShow: false,
      taskID: undefined,
      dialogLoading: false,
      loadingMessage: "请稍后...",
      isUploadSuccess: false,
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

    async loadBlanceAPi1() {
      try {
        const response = await fetch(this.balanceURL + '/Client2Intermediate/addTask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "task_id": this.taskID,
            "input_img": this.uploadedImage.split(",")[1],
          })
        })
        if (response.ok) {
          console.log("上传到负载均衡成功");
          this.dialogLoading = false;
          this.isUploadSuccess = true;
        }

      } catch (error) {
        console.log("请求失败" + error);
        this.loadingMessage = "请求失败，请刷新页面重试";
      }
    },

    async backendApi1() {

      try {
        const response = await fetch(this.backURL + '/user_upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "user_id": this.user["sub"],
            "input_img": this.uploadedImage,
            "message": this.userBlessing,
            "is_show": this.isShow,
            "username": this.user["name"],
            "profile_img": this.user["picture"],
          })
        })
        if (response.ok) {
          console.log("上传成功");
          var result = (await response.text())
          console.log(`生成的GUID为${result}`);
          this.taskID = result;
          console.log("开始上传到负载均衡");
          this.loadBlanceAPi1();
        }

      } catch (error) {
        console.log("请求失败" + error);
        this.loadingMessage = "请求失败，请刷新页面重试";
      }
    },

    uploadImgToBackend(isShow) {
      this.dialogLoading = true;
      console.log("开始上传图片到后端");
      this.dialogVisible = false;
      this.isShow = isShow;
      this.backendApi1();
    }
    ,
  },
}
</script>


<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="4" lg="3">
        <label for="upload" class="upload-label">
          <v-img
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
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-text-field placeholder="请输入毕业寄语..." v-model="userBlessing"></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn @click="dialogVisible = true,isUploadSuccess=false">提交</v-btn>
    </v-row>
    <v-row align="center" justify="center" v-show="isUploadSuccess">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-alert type="success">上传成功！</v-alert>
      </v-col>
    </v-row>
  </v-container>

  <!--  是否上传大屏幕的弹窗-->
  <v-dialog v-model="dialogVisible" max-width="500px">
    <v-card>
      <!--      <v-card-title>-->
      <!--        <span class="headline">弹窗标题</span>-->
      <!--      </v-card-title>-->
      <v-card-text>
        是否要上传大屏幕？
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="uploadImgToBackend(true)">是的</v-btn>
        <v-btn color="pink" @click="uploadImgToBackend(false)">不要不要</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!--      加载页面-->
  <v-dialog
      v-model="dialogLoading"
      :scrim="false"
      persistent
      width="auto"
  >
    <v-card
        color="primary"
    >
      <v-card-text>
        {{ loadingMessage }}
        <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>