<script>
import navigator from './theHeader.vue'
import pofile from "@/components/userprofile.vue";

export default {
  components: {
    navigator,
    pofile,
  },
  data() {
    return {
      isAuthenticated: this.$auth0.isAuthenticated,
      userinfo: this.$auth0.user,
    }
  },
  methods: {
    login() {
      this.$auth0.loginWithRedirect();
    },
    logout() {
      this.$auth0.logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    }
  },
  computed: {
    showWhatActvator() {
      return this.userinfo['picture'] ? this.userinfo['picture'] : "https://cdn.vuetifyjs.com/images/john.jpg"
    },
    showWhatUserName() {
      if (!this.isAuthenticated) {
        return "Not Login"
      }
      return this.userinfo['name']
    }
    ,
  }
  ,

}
</script>

<template>


  <v-main>
    <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-avatar color="surface-variant" size="72">
            <v-img
                :src="showWhatActvator"
                width="100%"
                aspect-ratio="1"
                contain
            ></v-img>
          </v-avatar>
        </v-row>
        <v-row justify="center">
          <v-label :text="showWhatUserName"></v-label>
        </v-row>
      <v-row justify="center" style="margin: 25px">
        <v-btn @click="login" v-if="!isAuthenticated">Log in</v-btn>
        <v-btn @click="logout" v-else>Log out</v-btn>
      </v-row>


    </v-container>
  </v-main>


  <!--  是否显示用户调试信息-->
    <pofile></pofile>

</template>


<style scoped>

</style>