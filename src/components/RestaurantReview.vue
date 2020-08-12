<template>
  <div>
    {{reviewInfo.title}}<br>
    {{reviewInfo.upload_date}}<br>
    {{reviewInfo.channels.name}}
    <img :src="reviewInfo.channels.thumbnail_url" width="50px"><br>
    <youtube :video-id="reviewInfo.youtube_id" ref="youtube" @playing="playing" :fitParent="true" :resize="true" ></youtube>
    <button @click="seekTo()">play</button>  
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
    }
  }
}
</script>

<style>

</style>