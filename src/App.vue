<script>
import navigator from './components/theHeader.vue'
import uploadPage from './components/uploadPage.vue'

export default {
  components: {
    navigator,
    uploadPage

  },
  data() {
    return {}
  },
  methods: {
    showPageIndex() {
      // 输出现在的页面索引
      console.log(this.$refs.nav.nowPage);
    },
  },
  computed: {}
}
</script>

<template>
  <v-app>
    <uploadPage></uploadPage>
    <!--    <v-btn @click="showimg">img</v-btn>-->
    <navigator ref="nav"/>
  </v-app>

</template>