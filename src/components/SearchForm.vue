<template>
  <form v-on:submit.prevent="search">
    <input v-model="searchText" type="text">
    <button type="submit">검색</button>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  data: function() {
    return {
      searchText: '',
    }
  },
  methods: {
    search: function() {
      var data = {
        searchText : this.searchText
      }
      console.log(this.searchText);
      var url = ''; //api 주소
      axios.post(url, data)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        })
    }
  }
}
</script>

<style>

</style>