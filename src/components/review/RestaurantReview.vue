<template>
  <div>
    <Header v-bind:restaurantName = "restaurantName"></Header>
    <iframe :src="`https://www.youtube.com/embed/${youtubeId}`" frameborder="0" width="95%" height="200px"></iframe>
    <br>
    {{reviewInfo.title}}<br>
    {{reviewInfo.upload_date}}<br>
    {{reviewInfo.channel.name}}<br>
    <img :src="reviewInfo.channel.thumbnail_url" width="50px">
  </div>
</template>

<script>
import Header from '../Header';
import axios from 'axios';

export default {
  components: {
    Header,
  },
  data: function() {
    return {
      reviewInfo: [],
      youtubeUrl: [],
      youtubeId: '',
      restaurantName: '',
      isReviewInfoLoaded: false
    }
  },
  computed: {
    reviewId: function() {
      return this.$route.params.reviewId
    },
    restaurantId: function() {
      return this.$route.params.restaurantId
    }
  },
  created() {
    this.loadReview();
    this.loadRestaurant();
  },
  methods: {
    loadReview : function() {
      let url = `http://127.0.0.1:3000/video_reviews/${this.reviewId}`;
      axios.get(url)
        .then((response) => {
          this.reviewInfo = response.data.data[0]
          this.youtubeUrl = this.reviewInfo.youtube_url.split('=')
          this.youtubeId = this.youtubeUrl[1]
          this.isReviewInfoLoaded = true
        }) // TODO: reviewInfo에 watch 적용하여 youtubeUrl과 Id 파싱 로직을 api response context에서 분리
        .catch((error) => {
          console.log(error);
          this.isReviewInfoLoaded = true
        })
    },
    loadRestaurant: function() {
      let url = `http://127.0.0.1:3000/restaurants/${this.restaurantId}`;
      axios.get(url)
        .then((response) => {
          this.restaurantInfo = response.data.data[0]
          this.isRestaurantInfoLoaded = true
          this.restaurantName = this.restaurantInfo.name
        })
        .catch((error) => {
          console.log(error);
          this.isRestaurantInfoLoaded = true
        })
    },
  }
}

</script>

<style>

</style>