<template>
  <div>
    <Header></Header>
    <!-- video  -->
    <restaurantReview></restaurantReview>
    {{reviewInfo}}
    <!-- restaurant info  -->
    <restaurantInfo></restaurantInfo>
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
      reviewInfo: {},
      isReviewInfoLoaded: false
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
          for(let i in response.data.data) {
            this.reviewInfo = response.data.data[i]
            this.isReviewInfoLoaded = true
          }
        })
        .catch((error) => {
          console.log(error);
          this.isReviewInfoLoaded = true
        })
    }
  }
}
</script>

<style>

</style>