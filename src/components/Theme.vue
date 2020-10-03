<template>
  <div :class="{ scrolled: !view.atTopOfPage }" class="container pt-pb-10 between-component chewingpick">
    <div class="wrap">
      <p class="mb-05">츄잉픽, NOW!</p>
      <button v-for="(tc, i) in tpoCategories" 
              :key="i" 
              @click="sendTPO(i)"
              class="mr-10px theme-btn"
              :class="{ on: tpoCategory === tc }"
              >
              {{tc}}
      </button>
      <button class="mr-10 theme-btn" 
              @click="sendPin()"
              :class="{on: tpoCategory === 'pin'}">북마크</button>
    </div>
    <div>
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
      },
      currentIndex: undefined
    }
  },
  props: {
    isNext: {
      type: Boolean
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  created() {
    this.loadTPO();
  },
  watch: {
    isNext : function(val){
      if (val) {
        this.sendTPO((this.currentIndex + 1) % this.tpoCategories.length)
        //NOTE : isNext가 바뀌면 다음 인덱스로 
      }
    }
  },
  methods: {
    loadTPO: function() {
      let url = '/api/tpo_categories';
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
    sendTPO: function(tpoCategoryIndex) {
      this.tpoCategory = this.tpoCategories[tpoCategoryIndex]
      this.currentIndex = tpoCategoryIndex
      const parameter = {tpoCategory: this.tpoCategory}
      this.$emit('parent', parameter)
    },
    sendPin: function() {
      this.tpoCategory = 'pin'
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