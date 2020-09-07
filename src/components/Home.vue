<template>
  <div class="background">
    <Header></Header>
    <Theme @parent="handleEvent"></Theme>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="1000" >
      <div v-for="(reviewInfo, i) in data" :key="i">
        <restaurantReview v-bind:reviewInfo="reviewInfo"></restaurantReview>
        <restaurantInfo v-bind:reviewInfo="reviewInfo"></restaurantInfo>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Header from './Header.vue'
import RestaurantReview from './RestaurantReview.vue'
import RestaurantInfo from './RestaurantInfo.vue'
import Theme from './Theme.vue'

export default {
  components: {
    Header,
    RestaurantReview,
    RestaurantInfo,
    Theme
  },
  data: function() {
    return {
      data: [],
      busy: false,
      tpoCategory: '',
      isRestaurantInfoFoldeds: [],
      cursorId: '',
      prevData: [0,0,0,0,0],
    }
  },
  created() {
  },
  methods: {
    loadMore: function() {
      console.log(this.cursorId)
      console.log(this.prevData)
      if(this.prevData.length==0) {
        console.log('다봤어, 다음 카테고리로 넘어가')
        return []
      }
      this.busy = true
      let url = `http://127.0.0.1:3000/video_reviews?cursorId=${this.cursorId}`;
      if (this.tpoCategory) {
        url = `${url}&category=${this.tpoCategory}`
      }
      axios.get(url)
        .then((response) => {
          response.data.data.forEach(element => {
            this.data.push(element)
          })
          this.isRestaurantInfoFoldeds = []
          this.prevData = response.data.data
          this.cursorId = this.data[this.data.length - 1].id
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.busy = false
        })
    },
    handleEvent: function(event) {
      const {tpoCategory} = event
      this.tpoCategory = tpoCategory
      this.data = []
      this.loadMore()
    }
  }
}
</script>

<style>

</style>