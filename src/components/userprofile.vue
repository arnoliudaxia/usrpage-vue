<template>
  <div v-if="isLoading">Loading ...</div>
  <div v-else>
    <h2>User Profile</h2>
<!--    <button @click="login">Log in</button>-->

    <v-alert type="error" text="未登录" v-if="!isAuthenticated">

    </v-alert>

    <pre v-if="isAuthenticated">
        <code>{{ user }}</code>
        {{user["picture"]}}
      </pre>
  </div>
</template>
<script>
  // Options API
  export default {
    data() {
      return {
        user: this.$auth0.user,
        isAuthenticated: this.$auth0.isAuthenticated,
        isLoading: this.$auth0.isLoading,
      };
    },
    methods: {
      login() {
        this.$auth0.loginWithRedirect();
      }
    }
  };
</script>