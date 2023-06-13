<script>
export default {
  data() {
    return {
      nowPage: 0,
      isAuthenticated: this.$auth0.isAuthenticated,

    }
  },
  methods: {
    showStatus() {
      console.log(this.nowPage);
    },
  },
}
</script>

<template>
  <v-layout class="overflow-visible" style="height: 56px;">
    <v-bottom-navigation
        v-model="nowPage"
        active
        color="primary"
        grow
        style="position: fixed"
    >

      <v-btn @click="showStatus" href="#/">
        <v-icon icon="mdi-account"></v-icon>
        User
      </v-btn>


      <v-btn v-if="isAuthenticated" @click="showStatus" href="#/upload">
        <v-icon icon="mdi-upload"></v-icon>
        Upload
      </v-btn>

      <v-btn v-if="isAuthenticated" @click="showStatus" href="#/history">
        <v-icon icon="mdi-history"></v-icon>
        History
      </v-btn>

    </v-bottom-navigation>
  </v-layout>
</template>

<style scoped>
</style>
