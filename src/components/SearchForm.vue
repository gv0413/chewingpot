<template>
  <div>
    <form v-on:submit.prevent="search">
      <input v-model="searchText" type="text">
      <button type="submit">검색</button>
    </form>  
    <div v-for="(searchKeyword, i) in searchKeywords" :key="i">
      {{searchKeyword}}
    </div>
  </div>
  

</template>

<script>
// import axios from 'axios'

export default {
  data: function() {
    return {
      searchText: '',
      searchKeywords: [],
    }
  },
  methods: {
    search: function() {
      // var data = {
      //   searchText : this.searchText,
      // }
      // var url = 'http://127.0.0.1:3000/search'; 
      // axios.get(url, data)
      //   .then(function(response) {
      //     console.log(response);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   })

      this.getKeywords()
    },
    getKeywords : function() {
      this.searchKeywords = this.searchText.split(' ')
    }
  }
}
</script>

<style>

</style>