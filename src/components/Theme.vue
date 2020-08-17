<template>
  <div class="container pt-pb-10 between-component">
    <div class="wrap">
      <p class="mb-05">츄잉픽, NOW!</p>
      <button v-for="(tpoCategory, i) in tpoCategories" 
              :key="i" 
              class="mr-10px theme-btn">
              {{tpoCategory}}
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      tpoCategories: [],
      isTPOCategoriesLoaded: false,
    }
  },
  created() {
    this.loadTPO();
  },
  methods: {
    loadTPO: function() {
      let url = 'http://127.0.0.1:3000/tpo_categories';
      axios.get(url)
        .then((response) => {
          this.tpoCategories = response.data.data.tpo_categories
          this.isTPOCategoriesLoaded = true
        })
        .catch((error) => {
          console.log(error);
          this.isTPOCategoriesLoaded = true
        })
    }
  }
}
</script>

<style>

</style>