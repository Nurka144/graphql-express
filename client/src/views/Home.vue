<template>
  <div class="home">
    <router-link to="/blog">blog</router-link>
    <router-view></router-view>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
}
</script>
