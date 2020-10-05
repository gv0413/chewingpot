<template>
  <div class="container between-component">
    <div class="wrap">
      <div class="text-center">
        <button class="detail-btn" @click="fold"> 식당 정보 보기</button> 
      </div>
      <hr class="border-gry">
      <div class="pt-pb-10" v-if="isRestaurantInfoOpen">
        <i class="fas fa-utensils mr-1 mb-05"></i>{{reviewInfo.restaurants.name}} ㅣ {{reviewInfo.restaurants.category}}<br>
        <i class="fas fa-map-marker-alt mr-1 mb-05"></i>{{reviewInfo.restaurants.location}}<br>
        <i class="fas fa-phone-alt mr-1 mb-1"></i>{{reviewInfo.restaurants.contact}}<br>
        <div v-if="!reviewInfo.restaurants.is_closed">
          <restaurant-map v-bind:restaurantInfo="reviewInfo.restaurants"></restaurant-map> 
        </div>
        <div v-else class="text-center t-primary background pt-pb-5">
          <i class="fas fa-exclamation-circle"></i>
          폐점한 식당입니다.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RestaurantMap from './RestaurantMap'
export default {
  components: {
    RestaurantMap,
  },
  data: function() {
    return {
      isRestaurantInfoOpen: false
    }
  },
  props: {
    reviewInfo: {
      type: Object
    },
    focusedInfoId: {
      type: Number
    }
  },
  watch: {
    focusedInfoId: function(val){
      if(val !== this.reviewInfo.id) {
        this.isRestaurantInfoOpen = false
      }
    }
  },
  methods: {
    fold: function(){
      this.isRestaurantInfoOpen = !this.isRestaurantInfoOpen
      if(this.isRestaurantInfoOpen) {
        this.$emit('sendOpenId', this.reviewInfo.id)
      } 
    }
  }
}
</script>

<style>

</style>