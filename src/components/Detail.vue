<template>
  <div>
    <Header></Header>
    <main v-for="(reviewInfo, i) in data" :key="i" class="detail-wrap bc-white">
      <section v-if="reviewInfo.is_visible">
        <restaurantReview v-bind:reviewInfo="reviewInfo"></restaurantReview>
        <restaurantInfo v-bind:reviewInfo="reviewInfo"></restaurantInfo>
        <div class="wrap text-center">
          <button class="wrap detail-btn view-more-btn mb-2" @click="$router.push({name: 'home'})">
            다른 리뷰 보기
          </button>
        </div>
      </section>
      <section v-else class="text-center">
        삭제되었거나 요청에 의해 가려진 콘텐츠입니다.
      </section>
    </main>
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
    RestaurantInfo,
  },
  data: function() {
    return {
      id: this.$route.params.id,
      data : [],
    }
  },
  created() {
    this.loadDetail()
  },
  methods: {
    loadDetail: function() {
      const reviewId = JSON.parse("["+this.id+"]")
      let url = `/api/video_reviews/by-ids?reviewIds=${JSON.stringify(reviewId)}`
      axios.get(url)
        .then((response) => {
          response.data.data.forEach(element => {
            this.data.push(element)
          })
          this.isRestaurantInfoFoldeds = []
          this.isScrollDisabled = true
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.busy = false
        })
    }
  }
}
</script>

<style>

</style>