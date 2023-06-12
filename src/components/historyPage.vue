<script>

export default {
  props: ['backURL', "balanceURL"],

  data() {
    return {
      theHistories: [
        // {
        //   "imgurl": "https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
        //   "imgTime": "2023-08-01,18:20",
        //   "status": 1
        // },
        // {
        //   "imgurl": "https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
        //   "imgTime": "2023-08-02,11:20",
        //   "status": 0
        // },
      ],
      user: this.$auth0.user,

    }
  },
  methods: {},
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
          console.log(data);
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
              console.log(key, data[key]);
              var theimg=data[key];
              this.theHistories.push({
                "imgurl":theimg["input_img"],
                "imgTime":theimg["date_added"],
                // TODO isfinished
                "status": 1
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
    <v-container fluid fill-height>
      <v-row justify="space-around" v-for="img in theHistories" style="margin: 20px;">
        <v-card width="400" v-if="img.status">
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
        <v-card width="400" loading v-else>
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
    </v-container>
  </v-main>


  <!--  是否显示用户调试信息-->
  <!--  <pofile></pofile>-->

</template>


<style scoped>

</style>