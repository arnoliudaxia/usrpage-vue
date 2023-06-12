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
      currentPath: window.location.hash,
      pages:["userpage","uploadPage","navigator"],
      pageIn:0,
    }
  },
  methods: {

  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    },
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  }
}
</script>

<template>
  <v-app>
    <component :is="currentView"/>
    <navigator
        ref="nav"/>
  </v-app>


</template>