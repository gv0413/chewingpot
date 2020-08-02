<template>
  <div>
    리뷰 상세 페이지
    <Header/>
    <iframe :src="`https://www.youtube.com/embed/${youtubeId}`" frameborder="0"></iframe>
    <br>
    {{reviewInfo.title}}<br>
    {{reviewInfo.upload_date}}<br>
    <!-- channel thumbnail, channel name 필요 -->
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
      isReviewInfoLoaded: false
    }
  },
  computed: {
    reviewId: function() {
      return this.$route.params.reviewId
    }
  },
  created() {
    this.loadReview();
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
    }
  }
}

</script>

<style>

</style>