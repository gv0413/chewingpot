<template>
  <div>
    <Header></Header>
    <Theme></Theme>
    <div v-if="isReviewInfosLoaded">
      <div v-for="(reviewInfo, i) in reviewInfos" :key="i">
        <restaurantReview v-bind:reviewInfo="reviewInfo" v-bind:index="i" @parent="handleEvent"></restaurantReview>
        <restaurantInfo v-if="isRestaurantInfoFoldeds[i]" v-bind:reviewInfo="reviewInfo"></restaurantInfo>
        <hr>
      </div>
    </div>
    <div v-else>
      Loading...
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
      reviewInfos: [],
      isReviewInfosLoaded: false,
      isRestaurantInfoFoldeds: [],
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      let url = 'http://127.0.0.1:3000/video_reviews';
      axios.get(url)
        .then((response) => {
          this.reviewInfos = response.data.data
          this.isReviewInfosLoaded = true
          this.isRestaurantInfoFoldeds = []
          for(let i=0; i<this.reviewInfos.length; i++) {
            this.isRestaurantInfoFoldeds.push(false)
          }
        })
        .catch((error) => {
          console.log(error);
          this.isReviewInfosLoaded = true
        })
    },
    handleEvent: function(event) {
      console.log(event)
      const {isRestaurantInfoFolded, index} = event
      console.log(isRestaurantInfoFolded)
      console.log(index)
      this.isRestaurantInfoFoldeds[index] = isRestaurantInfoFolded
      console.log(this.isRestaurantInfoFoldeds[index])
      console.log(this.isRestaurantInfoFoldeds)
    },
  }
}
</script>

<style>

</style>