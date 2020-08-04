<template>
  <div>
    <div v-if="isRecommendedRestaurantsLoaded" >
      <div v-for="(recommendedRestaurant, i) in recommendedRestaurants" :key="i">
        <div v-if="recommendedRestaurant.id !== restaurantInfo.id">
          <hr>
          맛집 추천 컴포넌트 <br>
          {{recommendedRestaurant.name}} <br>
          {{recommendedRestaurant.category}}<br>
          {{recommendedRestaurant.contact}}<br>
          {{recommendedRestaurant.location}}<br>
        </div>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      recommendedRestaurants: [],
      isRecommendedRestaurantsLoaded: false
    }
  },
  props: {
    restaurantInfo: {
      type: Object
    }
  },
  computed: {
    recommendArea: function() {
      return this.restaurantInfo.location.split(' ')[0] + ' ' + this.restaurantInfo.location.split(' ')[1]
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      let url = `http://127.0.0.1:3000/restaurants?location=${this.recommendArea}`;
      axios.get(url)
        .then((response) => {
          console.log(response.data.data[0]);
          for(let i in response.data.data) {
            this.recommendedRestaurants[i] = response.data.data[i]
            this.isRecommendedRestaurantsLoaded = true
          }
        })
        .catch((error) => {
          console.log(error);
          this.isRecommendedRestaurantsLoaded = true
        })
    },
  }
}
</script>

<style>

</style>