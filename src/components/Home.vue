<template>
  <div>
    <Header></Header>
    <div v-if="isReviewInfosLoaded">
      <div v-for="(reviewInfo, i) in reviewInfos" :key="i">
        <restaurantReview v-model="parentValue" v-bind:reviewInfo="reviewInfo" @parent="handleEvent"></restaurantReview>
        <!-- {{parentValue}} -->
        <restaurantInfo v-if="parentValue" v-bind:reviewInfo="reviewInfo"></restaurantInfo>
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

export default {
  components: {
    Header,
    RestaurantReview,
    RestaurantInfo
  },
  data: function() {
    return {
      reviewInfos: [],
      isReviewInfosLoaded: false,
      parentValue: false,
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
        })
        .catch((error) => {
          console.log(error);
          this.isReviewInfosLoaded = true
        })
    },
    handleEvent: function(event) {
      this.parentValue = event
    },
  }
}
</script>

<style>

</style>