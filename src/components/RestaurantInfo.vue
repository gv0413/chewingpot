<template>
  <div class="container between-component">
    <div class="wrap">
      <div class="text-center">
        <button class="detail-btn" @click="fold"> 식당 정보 보기</button> 
      </div>
      <hr class="border-gry">
      <div class="pt-pb-10" v-if="isRestaurantInfoFolded">
        식당명 ㅣ {{reviewInfo.restaurants.name}} <br>
        식당위치 ㅣ {{reviewInfo.restaurants.location}}<br>
        연락처 ㅣ {{reviewInfo.restaurants.contact}}<br>
        카테고리 ㅣ {{reviewInfo.restaurants.category}}<br>
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