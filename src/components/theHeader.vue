<script>
export default {
  data() {
    return {
      nowPage: 0,
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
    <v-layout class="overflow-visible" style="height: 56px;" >
    <v-bottom-navigation
      v-model="nowPage"
      active
      color="primary"
      grow
    >
      <v-btn @click="showStatus" >
        <v-icon icon="mdi-upload"></v-icon>
        Upload
      </v-btn>

      <v-btn @click="showStatus" >
        <v-icon icon="mdi-history"></v-icon>
        History
      </v-btn>

    </v-bottom-navigation>
  </v-layout>
</template>

<style scoped>
</style>
