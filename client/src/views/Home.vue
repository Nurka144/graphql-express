<template>
  <div class="about">
    <h1>This is an home page</h1>
  </div>
</template>


<script>
import gql from 'graphql-tag'
    export default {
        data() {
            return {
                title: ""
            }
        },
        created() {
          
          this.$apollo.query({
            query: gql`query title {
            title
          }
          `})
          .then(data => console.log(data))
          .catch(err => console.log(err))

        },
    }
</script>
