<template>
  <div>
    맛집 추천 컴포넌트
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      recommendedRestaurants: [],
      isLoaded: false
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
            this.isLoaded = true
          }
        })
        .catch((error) => {
          console.log(error);
          this.isLoaded = true
        })
    },
  }
}
</script>

<style>

</style>