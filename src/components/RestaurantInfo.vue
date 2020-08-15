<template>
  <div class="container between-component">
    <div class="wrap">
      <div class="text-center">
        <button class="detail-btn" @click="fold"> 식당 정보 보기</button> 
      </div>
      <hr class="border-gry">
      <div class="pt-pb-10" v-if="isRestaurantInfoFolded">
        <i class="fas fa-utensils mr-1 mb-05"></i>{{reviewInfo.restaurants.name}} ㅣ {{reviewInfo.restaurants.category}}<br>
        <i class="fas fa-map-marker-alt mr-1 mb-05"></i>{{reviewInfo.restaurants.location}}<br>
        <i class="fas fa-phone-alt mr-1"></i>{{reviewInfo.restaurants.contact}}<br>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isRestaurantInfoFolded: false
    }
  },
  props: {
    reviewInfo: {
      type: Object
    }
  },
  methods: {
    fold: function(){
      this.isRestaurantInfoFolded = !this.isRestaurantInfoFolded
    }
  }
}
</script>

<style>

</style>