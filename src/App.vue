<script>
import navigator from './components/theHeader.vue'
import uploadPage from './components/uploadPage.vue'
import userpage from "@/components/userPage.vue";
import historyPage from "@/components/historyPage.vue";

const routes = {
  '/': userpage,
  '/upload': uploadPage,
  '/history': historyPage,

}

export default {
  components: {
    navigator,
    uploadPage,
    userpage,
  },
  data() {
    return {
      isAuthenticated: this.$auth0.isAuthenticated,
      currentPath: window.location.hash
    }
  },
  methods: {
    showPageIndex() {
      // 输出现在的页面索引
      console.log(this.$refs.nav.nowPage);
    },

  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  }
}
</script>

<template>
  <!--    <Auth></Auth>-->
  <!--    <pofile></pofile>-->
  <!--    <v-btn @click="showimg">img</v-btn>-->
  <!--  <uploadPage></uploadPage>-->
  <v-app>
    <component :is="currentView"/>
    <!--    <userpage v-if="getPageIndex()==0"></userpage>-->
    <navigator
        ref="nav"/>
  </v-app>


</template>