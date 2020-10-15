<template>
  <div class="container between-component">
    <div class="wrap">
      <div class="text-center">
        <button class="detail-btn" @click="fold(reviewInfo.id, reviewInfo.title, reviewInfo.restaurants.id, reviewInfo.restaurants.name)"> 식당 정보 보기</button> 
      </div>
      <hr class="border-gry">
      <div class="pt-pb-10" v-if="isRestaurantInfoOpen">
        <div v-if="reviewInfo.restaurants === null" class="text-center t-primary background pt-pb-5">
          <i class="fas fa-exclamation-circle"></i> 식당 정보가 등록되지 않았습니다.
        </div>
        <div v-else>
          <i class="fas fa-utensils mr-1 mb-05"></i>{{reviewInfo.restaurants.name}} ㅣ {{reviewInfo.restaurants.category}}<br>
          <i class="fas fa-map-marker-alt mr-1 mb-05"></i>{{reviewInfo.restaurants.location}}<br>
          <p v-if="reviewInfo.restaurants.contact">
            <i class="fas fa-phone-alt mb-05" style="margin-right: 11px;"></i>{{reviewInfo.restaurants.contact}} <br>
          </p>
          <p v-else>
            <i class="fas fa-exclamation-circle mb-1" style="margin-right: 11px;"></i>등록된 연락처가 없습니다.
          </p>
          <div v-if="!reviewInfo.restaurants.is_closed">
            <restaurant-map v-bind:restaurantInfo="reviewInfo.restaurants"></restaurant-map> 
          </div>
          <div v-else class="text-center t-primary background pt-pb-5">
            <i class="fas fa-exclamation-circle"></i>
            폐점한 식당입니다.
          </div>
          <a :href="`tel:${reviewInfo.restaurants.contact}`" 
              class="tel text-center" 
              v-if="reviewInfo.restaurants && reviewInfo.restaurants.contact && !reviewInfo.restaurants.is_closed" 
              @click="addContactFbq(reviewInfo.id, reviewInfo.title, reviewInfo.restaurants.id, reviewInfo.restaurants.name)">
            <i class="fas fa-phone-alt" style="margin-right: 11px;"></i>전화하기<br>
          </a>
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
    fold: function(reviewId, reviewTitle, restaurantId, restaurantName){
      this.isRestaurantInfoOpen = !this.isRestaurantInfoOpen
      if(this.isRestaurantInfoOpen) {
        this.$emit('sendOpenId', this.reviewInfo.id)
        // eslint-disable-next-line no-undef
        fbq('track', 'FindLocation', {
          review_id : reviewId,
          review_title: reviewTitle,
          restaurant_id: restaurantId,
          restaurant_name: restaurantName
        })
      } 
    },
    addContactFbq: function(reviewId, reviewTitle, restaurantId, restaurantName) {
      // eslint-disable-next-line no-undef
      fbq('track', 'Contact', {
        review_id : reviewId,
        review_title: reviewTitle,
        restaurant_id: restaurantId,
        restaurant_name: restaurantName
      })
    }
  }
}
</script>

<style>

</style>