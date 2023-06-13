<script>

import Detail from "./imageDetail.vue"

export default {
  props: ['backURL', "balanceURL"],
  components: {
    Detail,
  },
  data() {
    return {
      theHistories: [
        // {
        //   "imgurl": "https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
        //   "imgTime": "2023-08-01,18:20",
        //   "status": 1,
        //   "imgID": "dqoiwjeoiwq"
        // },
        // {
        //   "imgurl": "https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
        //   "imgTime": "2023-08-02,11:20",
        //   "status": 0,
        //   "imgID": "dqoiwjeoiwwq"
        //
        // },
      ],
      user: this.$auth0.user,
      cleanHistorydialogVisible: false,
      imgDetailID: undefined,
      showImgDetail: false,
      originImage: undefined,
      genImgs: undefined,
      genImgsIndex: undefined,
      bestImgIndex: undefined,
      dialogLoading: false,
      loadingMessage:"请稍后...",
      bestSnackbar:false,
      bestMask:undefined,
      bestMessage:"请在下方生成图中选择一个",
    }
  },
  methods: {
    cleanHistory() {
      //   在这里清空用户的历史
      fetch(this.backURL + "/clear_history", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "user_id": this.user["sub"],
        })
      })
          .then(response => {
            if (response.ok) {
              console.log("清除历史成功!");
            }
          })
          .catch(error => {
            // 处理错误
            console.error(error);
          });

    },
    gotoImageDetail(id) {
      this.dialogLoading = true;
      // 设置选中的img id
      this.imgDetailID = id;
      // 然后获取该图片的详细信息
      fetch(this.backURL + "/get_result", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "user_id": this.user["sub"],
          "task_id": this.imgDetailID,
        })
      })
          .then(response => response.json())
          .then(data => {
            // 处理响应数据
            console.log("获得的图片详情为");
            console.log(data);
            this.originImage = data["input_img"];
            this.genImgs = data["gen_img"];
            this.genImgsIndex = data["raw_idx"];
            this.bestMask=Array.from({ length: this.genImgsIndex.length }, () => 1);

            // console.log(this.genImgs);
            this.showImgDetail = true;
            this.dialogLoading = false;

          })
          .catch(error => {
            // 处理错误
            console.error(error);
            this.loadingMessage = "失败，请刷新页面";

          });

    },
    selectBestGenimgApi(indexImg)
    {
      this.dialogLoading = true;
      this.bestMask=Array.from({ length: this.bestMask.length }, () => 0);
      this.bestMask[indexImg]=1;

      fetch(this.backURL + "/select_best", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "show_idx": indexImg,
          "task_id": this.imgDetailID,
        })
      })
          .then(response => {
            if (response.ok)
            {
              console.log("上传best完成");
            }
            this.dialogLoading = false;
            this.bestSnackbar=true;
            this.bestMessage="已选择第"+(indexImg+1)+"张图";

          })
          .catch(error => {
            // 处理错误
            console.error(error);
            this.loadingMessage = "失败，请刷新页面";
            this.bestSnackbar=true;
          });
    }
  },
  computed: {},
  mounted() {
    console.log("开始获取用户的历史图片");
    fetch(this.backURL + "/user_history", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "user_id": this.user["sub"],
      })
    })
        .then(response => response.json())
        .then(data => {
          // 处理响应数据
          // console.log(data);
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
              console.log(key, data[key]);
              var theimg = data[key];
              this.theHistories.push({
                "imgurl": theimg["input_img"],
                "imgTime": theimg["date_added"],
                "status": theimg["is_finished"] ? 1 : 0,
                "imgID": key,
              })
            }
          }
        })
        .catch(error => {
          // 处理错误
          console.error(error);
        });

  }

}
</script>

<template>


  <v-main>
    <v-container v-show="!showImgDetail" fluid fill-height>
      <v-row justify="space-around" v-for="img in theHistories" style="margin: 20px;">
        <v-card width="400" v-if="img.status" @click="gotoImageDetail(img.imgID)">
          <v-card-title>
            {{ img.status ? "完成" : "生成中..." }}
          </v-card-title>
          <v-img
              height="auto"
              :src="img.imgurl"
              cover
              class="text-white"
          >
          </v-img>

          <v-card-text>
            <div class="font-weight-bold ms-1 mb-2">
              {{ img.imgTime }}
            </div>
          </v-card-text>

        </v-card>

        <!--        @click="gotoImageDetail(img.imgID)"-->

        <v-card width="400" loading v-else @click="gotoImageDetail(img.imgID)">
          <v-card-title>
            {{ img.status ? "完成" : "生成中..." }}
          </v-card-title>
          <v-img
              height="200"
              :src="img.imgurl"
              cover
              class="text-white"
          >
          </v-img>

          <v-card-text>
            <div class="font-weight-bold ms-1 mb-2">
              {{ img.imgTime }}
            </div>
          </v-card-text>

        </v-card>
      </v-row>

<!--      <v-row>-->
<!--        <v-alert v-if="theHistories.length==0" type="error">什么你还没有生成图片？</v-alert>-->
<!--      </v-row>-->

      <v-row justify="space-around">
        <v-btn text="清空历史" @click="cleanHistorydialogVisible=true"></v-btn>
        <v-dialog v-model="cleanHistorydialogVisible" max-width="500px">
          <v-card>
            <v-card-text>
              是否真的要清空历史？
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="cleanHistory">是的</v-btn>
              <v-btn color="pink" @click="cleanHistorydialogVisible=false">不要不要</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <!--    生成详情页面-->
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
            {{loadingMessage}}
            <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-row justify="center">
        <v-dialog v-model="showImgDetail" max-width="500px">
          <v-card>
                  <v-card-title>
                    <span class="headline">任务ID</span>
                  </v-card-title>
            <v-card-subtitle>{{imgDetailID}}</v-card-subtitle>
            <v-card-text>
              <v-card>
                <v-card-title>原图</v-card-title>
                <v-img :src="originImage"></v-img>
              </v-card>
              <v-alert
                  :value="true"
                  type="success"
                  elevation="2"
                  icon="mdi-check-circle-outline">{{bestMessage}}
              </v-alert>
              <template v-for="n in genImgs.length">
                <v-card @click="selectBestGenimgApi(genImgsIndex[n-1])" v-if="bestMask[n-1]===1">
                  <v-card-title>生成图{{n}}</v-card-title>
                  <v-img :src='"data:image/png;base64,"+genImgs[n-1]'></v-img>
                </v-card>
              </template>

            </v-card-text>

          </v-card>
        </v-dialog>

      </v-row>
    </v-container>

<!--&lt;!&ndash;    best选中成功反馈&ndash;&gt;-->
<!--    <v-snackbar-->
<!--      v-model="bestSnackbar"-->
<!--    >-->
<!--      成功选择图片！-->

<!--      <template v-slot:actions>-->
<!--        <v-btn-->
<!--          color="pink"-->
<!--          variant="text"-->
<!--          @click="bestSnackbar = false"-->
<!--        >-->
<!--          Close-->
<!--        </v-btn>-->
<!--      </template>-->
<!--    </v-snackbar>-->

  </v-main>


</template>


<style scoped>

</style>