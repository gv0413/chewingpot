<template>
  <div> 
    <div v-if="isRestaurantInfoLoaded && isReviewInfosLoaded" >
      <search-form></search-form>
      <restaurant-card v-bind:restaurantInfo="restaurantInfo" ></restaurant-card>
      <restaurant-map v-bind:restaurantInfo="restaurantInfo"></restaurant-map>
      <div v-for="(reviewInfo, i) in reviewInfos" :key="i">
        <review-card v-bind:reviewInfo="reviewInfo"/>
      </div>
      <restaurant-menu></restaurant-menu>     
      <recommend-restaurant v-bind:restaurantInfo="restaurantInfo"></recommend-restaurant> 
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SearchForm from '../SearchForm.vue';
import RestaurantCard from './RestaurantCard.vue';
import ReviewCard from '../review/ReviewCard.vue';
import RestaurantMenu from '../RestaurantMenu.vue';
import RestaurantMap from '../RestaurantMap.vue';
import RecommendRestaurant from '../RecommendRestaurant.vue';

export default {
  components: {
    SearchForm, 
    RestaurantCard, 
    ReviewCard,
    RestaurantMenu,
    RestaurantMap,
    RecommendRestaurant
  },
  computed: {
    restaurantId: function() {
      return this.$route.params.restaurantId
    }
  },
  watch: {
    restaurantId : function(){
      this.restaurantInfo = {}
      this.reviewInfos = []
      this.isRestaurantInfoLoaded = false
      this.isReviewInfosLoaded = false
      this.loadData()
      this.loadReviews()
    }
  },
  data: function() {
    return {
      restaurantInfo: {},
      reviewInfos: [],
      isRestaurantInfoLoaded: false,
      isReviewInfosLoaded: false,
    }
  },
  created() {
    this.loadData()
    this.loadReviews()
  },
  methods: {
    loadData: function() {
      let url = `http://127.0.0.1:3000/restaurants/${this.restaurantId}`;
      axios.get(url)
        .then((response) => {
          this.restaurantInfo = response.data.data[0]
          this.isRestaurantInfoLoaded = true
        })
        .catch((error) => {
          console.log(error);
          this.isRestaurantInfoLoaded = true
        })
    },
    loadReviews : function() {
      let url = `http://127.0.0.1:3000/restaurants/${this.restaurantId}/video_reviews`;
      axios.get(url)
        .then((response) => {
          for(let i=0; i<response.data.data.length; i++) {
            this.reviewInfos[i] = response.data.data[i]
          }
          this.isReviewInfosLoaded = true
        })
        .catch((error) => {
          console.log(error)
          this.isReviewInfosLoaded = true
        })
    }
  }
}
</script>

<style>

</style>