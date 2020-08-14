<template>
  <div class="container pt-10px between-component">
    <div class="wrap">
      <div class="review-info-wrap">
        <img class="channel-img" :src="reviewInfo.channels.thumbnail_url" width="50px"><br>
        <div class="width-100">
          <p class="review-title t_bk">{{reviewInfo.title}}</p>
          <p class="left t_dgray">{{reviewInfo.channels.name}}</p>
          <p class="right t_dgray">{{reviewInfo.upload_date.split('T')[0]}}</p>
        </div>
      </div>
      <youtube class="mt-1" :video-id="reviewInfo.youtube_id" ref="youtube" @playing="playing" :fitParent="true" :resize="true" ></youtube>
      <div class="tag-container f13">
        <span class="tag">#삼겹살</span>
        <span class="tag">#썸남</span>
        <span class="tag">#썸녀</span>
        <span class="tag">#남자친구</span>
        <span class="tag">#여자친구</span>
      </div>
      <hr class="border-gry">
      <div class="chewing-time-btn-wrap">
        <div v-if="keywords.length==0">
          <p class="text-center empty-chewing-time"> 등록된 메뉴 정보가 없습니다.</p>
        </div>
        <div v-else class="mr-05" v-for="(keyword, i) in keywords" :key="i">
          <button class="pr-05 pl-05 chewing-time-btn" @click="seekTo(timeToNumber(keyword.video_time))">{{keyword.name}}</button>
        </div>
      </div>
      <hr class="border-gry" style="clear:both;">
      <div class="text-center">
        <button class="detail-btn" @click="updateValue"> 식당 정보 보기</button> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reviewInfo: {
      type: Object
    },
    index: {
      type: Number
    }
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
      const parameter = {isRestaurantInfoFolded: this.isShowable, index: this.index}
      console.log('parameter = ', parameter)
      this.$emit('parent', parameter);
    }
  }
}
</script>

<style>

</style>