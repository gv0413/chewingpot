<template>
  <div>
    <!-- {{reviewInfo}} -->
    썸네일 이미지 <br> <img :src="reviewInfo.video_thumbnail_url" alt="" width="100px" height="100px"> <br>
    채널 썸네일 이미지 <br> <img :src="reviewInfo.channel_thumbnail_url" alt="" width="100px" height="100px"> <br>
    {{reviewInfo.title}}<br>
    {{reviewInfo.channel_name}}<br> <br>
    <hr>
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
// /:id/video_reviews
</script>

<style>

</style>