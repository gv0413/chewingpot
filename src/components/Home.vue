<template>
  <div class="background">
    <Header></Header>
    <Theme @parent="handleEvent" v-bind:isNext="isNext"></Theme>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0" >
      <div v-for="(reviewInfo, i) in data" :key="i">
        <restaurantReview v-bind:reviewInfo="reviewInfo"></restaurantReview>
        <restaurantInfo v-bind:reviewInfo="reviewInfo"></restaurantInfo>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Header from './Header.vue'
import RestaurantReview from './RestaurantReview.vue'
import RestaurantInfo from './RestaurantInfo.vue'
import Theme from './Theme.vue'

export default {
  components: {
    Header,
    RestaurantReview,
    RestaurantInfo,
    Theme
  },
  data: function() {
    return {
      data: [],
      busy: false,
      tpoCategory: '',
      isRestaurantInfoFoldeds: [],
      cursorId: '',
      prevData: [0,0,0,0,0],
      isNext: false,
    }
  },
  created() {
  },
  methods: {
    //NOTE : TPO category 넘어갈 때 params 초기화
    initParams: function () {
      this.data = []
      this.busy = false
      this.tpoCategory = ''
      this.isRestaurantInfoFoldeds = []
      this.cursorId = ''
      this.prevData = [0,0,0,0,0]
    },
    loadMore: function() {
      if(this.prevData.length === 0) {
        const result = window.confirm('현재 카테고리의 모든 컨텐츠를 보셨습니다.\n다음 카테고리로 넘어가시겠습니까?');
        if (result) {
          this.isNext = true
          this.initParams()
        } else {
          this.prevData = [0]
        }
        return
      }
      this.busy = true
      let url = `/api/video_reviews?cursorId=${this.cursorId}`;
      if (this.tpoCategory) {
        url = `${url}&category=${this.tpoCategory}`
      }
      axios.get(url)
        .then((response) => {
          response.data.data.forEach(element => {
            this.data.push(element)
          })
          this.isRestaurantInfoFoldeds = []
          this.prevData = response.data.data
          this.cursorId = this.data[this.data.length - 1].id
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.busy = false
        })
    },
    handleEvent: function(event) {
      this.isNext = false
      const {tpoCategory} = event
      this.tpoCategory = tpoCategory
      this.data = []
      this.loadMore()
    }
  }
}
</script>

<style>

</style>