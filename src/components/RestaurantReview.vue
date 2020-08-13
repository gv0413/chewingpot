<template>
  <div class="wrap">
    <div class="review-info-wrap">
      <img class="channel-img" :src="reviewInfo.channels.thumbnail_url" width="50px"><br>
      <div>
        <p class="review-title t_bk">{{reviewInfo.title}}</p>
        <p class="left t_dgray">{{reviewInfo.channels.name}}</p>
        <p class="right t_dgray">{{reviewInfo.upload_date.split('T')[0]}}</p>
      </div>
    </div>
    <youtube class="mt-1" :video-id="reviewInfo.youtube_id" ref="youtube" @playing="playing" :fitParent="true" :resize="true" ></youtube>
    <div class="tag f13">#삼겹살 #썸남 #썸녀 #남자친구 #여자친구</div> <hr>
    <div class="mt-05 mb-05 flex">
      <button class="detail-btn center"> 영상에서 메뉴 보기</button>
      <button class="detail-btn center" @click="updateValue"> 식당 정보 보기</button> 
    </div>
    <hr class="mb-1">
    <!-- <button @click="seekTo()">play</button>   -->
    <div v-for="(keyword, i) in keywords" :key="i">
      <button @click="seekTo(timeToNumber(keyword.video_time))">{{keyword.name}}</button>
    </div>  
  </div>
</template>

<script>
export default {
  props: {
    reviewInfo: {
      type: Object
    },
  },
  data: function() {
    return {
      isShowable: false,
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    },
    keywords() {
      return this.reviewInfo.keywords
    }
  },
  methods: {
    seekTo(seekTime) {
      this.player.seekTo(seekTime)
    },
    playing() {
    },
    timeToNumber(timeString) {
      const parsedString = timeString.split('T')[1].split(':')
      const hours = parsedString[0]
      const minutes = parsedString[1]
      const seconds = parsedString[2].split('.')[0]
      return parseInt(hours*3600) + parseInt(minutes*60) + parseInt(seconds);
    },
    updateValue: function () {
      this.isShowable = !this.isShowable
      this.$emit('parent', this.isShowable);
    }
  }
}
</script>

<style>

</style>