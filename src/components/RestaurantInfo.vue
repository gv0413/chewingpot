<template>
  <div>
    식당명 ㅣ {{reviewInfo.restaurants.name}} <br>
    식당위치 ㅣ {{reviewInfo.restaurants.location}}<br>
    연락처 ㅣ {{reviewInfo.restaurants.contact}}<br>
    카테고리 ㅣ {{reviewInfo.restaurants.category}}<br>
  </div>
</template>

<script>
export default {
  props: {
    reviewInfo: {
      type: Object
    }
  }
}
</script>

<style>

</style>