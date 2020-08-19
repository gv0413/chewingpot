<template>
  <div class="wrap">
    <div v-if="isReviewInfoLoaded && iskeywordsInfoLoaded">
      <Header v-bind:restaurantName = "restaurantName"></Header>
      <youtube :video-id="youtubeId" ref="youtube" @playing="playing" :fitParent="true" :resize="true" ></youtube>
      <button @click="seekTo()">play</button>
      <br>
      {{reviewInfo.title}}<br>
      {{reviewInfo.upload_date}}<br>
      {{reviewInfo.channel.name}}<br>
      <img :src="reviewInfo.channel.thumbnail_url" width="50px"><br>
      <div v-for="(keywordsInfo, i) in keywordsInfos" :key="i">
        <button @click="seekTo(timeToNumber(keywordsInfo.video_time))">{{keywordsInfo.name}}</button>
      </div>
    </div>
    <div v-else>
      Loading...
    </div> 
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
      keywordsInfos: [],
      youtubeId: '',
      restaurantName: '',
      isReviewInfoLoaded: false,
      iskeywordsInfoLoaded : false
    }
  },
  computed: {
    reviewId: function() {
      return this.$route.params.reviewId
    },
    restaurantId: function() {
      return this.$route.params.restaurantId
    },
    player() {
      return this.$refs.youtube.player
    }
  },
  created() {
    this.loadReview();
    this.loadRestaurant();
    this.loadKeywords();
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
    loadKeywords: function() {
      let url =  `http://127.0.0.1:3000/video_reviews/${this.reviewId}/keywords`;
      axios.get(url)
        .then((response) => {
          for(let i=0; i<response.data.data.length; i++){
            this.keywordsInfos.push(response.data.data[i]);
          }
          this.iskeywordsInfoLoaded = true
        })
        .catch((error) => {
          console.log(error);
          this.iskeywordsInfoLoaded = true
        })
    },
    seekTo(seekTime) {
      this.player.seekTo(seekTime)
    },
    playing() {
    },
    timeToNumber(timeString) {
      const parsedString = timeString.split(':')
      return parseInt(parsedString[0]*3600) + parseInt(parsedString[1]*60) + parseInt(parsedString[2]);
    }
  }
}

</script>

<style>

</style>