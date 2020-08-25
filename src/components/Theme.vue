<template>
  <div :class="{ scrolled: !view.atTopOfPage }" class="container pt-pb-10 between-component chewingpick">
    <div class="wrap">
      <p class="mb-05">츄잉픽, NOW!</p>
      <button v-for="(tc, i) in tpoCategories" 
              :key="i" 
              @click="sendTPO(tc)"
              class="mr-10px theme-btn"
              :class="{ on: tpoCategory === tc }"
              >
              {{tc}}
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
      tpoCategory: '',
      isTPOCategoriesLoaded: false,
      view: {
        atTopOfPage: true
      }
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
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
    },
    sendTPO: function(tpoCategory) {
      this.tpoCategory = tpoCategory
      const parameter = {tpoCategory: this.tpoCategory}
      this.$emit('parent', parameter)
    },
    handleScroll(){
      // when the user scrolls, check the pageYOffset
      if(window.pageYOffset>0){
          // user is scrolled
          if(this.view.atTopOfPage) this.view.atTopOfPage = false
      }else{
          // user is at top of page
          if(!this.view.atTopOfPage) this.view.atTopOfPage = true
      }
    }
  }
}
</script>

<style>

</style>