<template>
  <div>
    <hr>
    썸네일 이미지 <br> <img :src="reviewInfo.video_thumbnail_url" alt="" width="100px" height="100px"> <br>
    채널 썸네일 이미지 <br> <img :src="reviewInfo.channel_thumbnail_url" alt="" width="100px" height="100px"> <br>
    제목 ㅣ{{reviewInfo.title}}<br>
    채널명 ㅣ{{reviewInfo.channel_name}}<br>
    <br>
  </div>
</template>

<script>
export default {
  props: {
    reviewInfo: {
      type: Object,
    }
  }
}
</script>

<style>

</style>