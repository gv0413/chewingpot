<template>
  <div class="background">
    <Header></Header>
    <Theme @parent="handleEvent" v-bind:isNext="isNext"></Theme>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0" >
      <div v-for="(reviewInfo, i) in data" :key="i">
        <restaurantReview v-bind:reviewInfo="reviewInfo" @getSelectedKeywords="getSelectedKeywords"></restaurantReview>
        <restaurantInfo v-bind:reviewInfo="reviewInfo" v-bind:focusedInfoId="focusedInfoId" @sendOpenId="handleOpenEvent"></restaurantInfo>
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
      selectedKeywords: '',
      prevData: [0,0,0,0,0],
      isNext: false,
      focusedInfoId: undefined,
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
      const dataIds = this.data.map(data => data.id)
      const prevLoaded = dataIds.slice(50 * (Math.floor(dataIds.length / 50))).join()
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
      
      let url = `/api/video_reviews?prevLoaded=${prevLoaded}&prevLoadedLength=${this.data.length}`;
      if (this.tpoCategory) {
        url = `${url}&category=${this.tpoCategory}`
      }
      if (this.selectedKeywords) {
        url = `${url}&selectedKeywords=${this.selectedKeywords}`
      }
      axios.get(url)
        .then((response) => {
          response.data.data.forEach(element => {
            this.data.push(element)
          })
          this.isRestaurantInfoFoldeds = []
          this.prevData = response.data.data
          this.cursorId = this.data[this.data.length - 1].id
          this.selectedKeywords = ''
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
    },
    handleOpenEvent: function(event) {
      this.focusedInfoId = event
    },
    getSelectedKeywords(event) {
      const selectedKeyword = event
      if(this.selectedKeywords.length === 0) {
        this.selectedKeywords += selectedKeyword
      } else {
        this.selectedKeywords += `,${selectedKeyword}`
      }
    } 
  }
}
</script>

<style>

</style>