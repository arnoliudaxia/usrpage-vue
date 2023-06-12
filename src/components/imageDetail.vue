<script>

export default {
  props: ["imgid", "backURL"],
  data() {
    return {
      user: this.$auth0.user,
      originImage: undefined,
      genImgs: undefined,
    }
  },
  methods: {},
  computed: {},
  mounted() {
    console.log("进入到详情页面");
    //   获取图片的详细信息
    fetch(this.backURL + "/get_result", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "user_id": this.user["sub"],
        "task_id": this.imgid,
      })
    })
        .then(response => response.json())
        .then(data => {
          // 处理响应数据
          // console.log(data);
          this.originImage = data["input_img"];
          this.genImgs = data["gen_img"];
        })
        .catch(error => {
          // 处理错误
          console.error(error);
        });

  }

}
</script>

<template>
  dqwjeowqij
  <v-btn>dqwewqe</v-btn>
<!--  <v-container fluid fill-height>-->
<!--      <v-row justify="space-around"  style="margin: 20px;">-->
<!--        <v-card width="400">-->
<!--          <v-img-->
<!--              height="200"-->
<!--              :src="originImage"-->
<!--              cover-->
<!--              class="text-white"-->
<!--          >-->
<!--          </v-img>-->

<!--          <v-card-text>-->
<!--            <div class="font-weight-bold ms-1 mb-2">-->
<!--              原图-->
<!--            </div>-->
<!--          </v-card-text>-->

<!--        </v-card>-->

<!--      </v-row>-->

<!--  </v-container>-->

</template>
