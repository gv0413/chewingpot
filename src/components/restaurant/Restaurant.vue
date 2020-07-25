<template>
  <div>
    Restaurant 상세 페이지
    <search-form></search-form>
    <restaurant-card v-bind:restaurantInfo="restaurantInfo" ></restaurant-card>
    <review-card></review-card>
  </div>
</template>

<script>
import axios from 'axios'
import SearchForm from '../SearchForm.vue';
import RestaurantCard from './RestaurantCard.vue';
import ReviewCard from '../review/ReviewCard.vue';

//restaurant_id를 가지고 조회
export default {
  components: {
    SearchForm, RestaurantCard, ReviewCard
  },
  computed: {
    restaurantId: function() {
      return this.$route.params.restaurantId
    }
  },
  data: function() {
    return {
      restaurantInfo: {},
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData: function() {
      var url = `http://127.0.0.1:3000/restaurants/${this.restaurantId}`;
      axios.get(url)
        .then((response) => {
          this.restaurantInfo = response.data.data[0]
          console.log(this.restaurantInfo)
        })
    }
  }
}
</script>

<style>

</style>