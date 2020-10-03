<template>
  <div class="container pt-10px">
    <div class="wrap">
      <div class="review-info-wrap">
        <img class="channel-img" :src="reviewInfo.channels.thumbnail_url" width="50px"><br>
        <div class="width-100">
          <p class="review-title t_bk">{{reviewInfo.title}}</p>
          <a href="javascript:void(0);" @click="togglePinId(reviewInfo.id)">
            <i class="far fa-bookmark"></i>
          </a>
          <p class="left t_dgray">{{reviewInfo.channels.name}}</p>
          <p class="right t_dgray">{{reviewInfo.upload_date.split('T')[0]}}</p>
        </div>
      </div>
      <youtube class="mt-1" :video-id="reviewInfo.youtube_id" ref="youtube" @playing="playing" :fitParent="true" :resize="true" :player-vars="playerVars"></youtube>
      <span v-for="(keyword, i) in keywords" :key="i">
        <span v-if="keyword.is_tpo==true" class="tag-container f13" >
          <span class="tag">#{{keyword.name}}</span>
        </span>
      </span>
      <hr class="border-gry mt-5px">
      <div class="chewing-time-btn-wrap">
        <div v-for="(keyword, i) in keywords" :key="i">
          <button v-if="keyword.video_time" class="pr-05 pl-05 chewing-time-btn" @click="seekTo(timeToNumber(keyword.video_time), keyword.name)">{{keyword.name}}</button>
        </div>
        <div v-if="keywords.length==0">
          <p class="text-center empty-chewing-time"> 등록된 메뉴 정보가 없습니다.</p>
        </div>
      </div>
      <hr class="border-gry" style="clear:both;">
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
      playerVars: {
        playsinline: 1
      },
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
    sendSelectedKeywords(selectedKeyword) {
      this.$emit('getSelectedKeywords', selectedKeyword)
    },
    seekTo(seekTime, selectedKeyword) {
      this.player.seekTo(seekTime)
      this.sendSelectedKeywords(selectedKeyword)
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
    togglePinId(id) {
      let pinIds = []
      const localStorageKey = 'pinIds'
      if (localStorage.getItem(localStorageKey)) {
        pinIds = JSON.parse("["+localStorage.getItem(localStorageKey)+"]")
      } 
      
      const reviewIdx = pinIds.indexOf(id)

      if(reviewIdx === -1) {
        pinIds.push(id)
        localStorage.setItem(localStorageKey, pinIds)
      } else {
        pinIds.splice(reviewIdx, 1)
        localStorage.setItem(localStorageKey, pinIds)
      }
      
      console.log(localStorage.getItem(localStorageKey))
    }
  }
}
</script>

<style>

</style>