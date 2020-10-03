<template>
  <div class="background">
    <Header></Header>
    <Theme @parent="handleEvent" v-bind:isNext="isNext"></Theme>
    <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" infinite-scroll-distance="100">
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
      randomSeed: -1,
      data: [],
      busy: false,
      tpoCategory: '',
      isRestaurantInfoFoldeds: [],
      cursorId: '',
      selectedKeywords: '',
      prevData: [0,0,0,0,0],
      isNext: false,
      focusedInfoId: undefined,
      isPin: false,
    }
  },
  created() {
    this.createRandomSeed()
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
      this.isPin = false
    },
    loadMore: function() {
      if (this.isPin) {
        const reviewIds = JSON.parse("["+localStorage.getItem('pinIds')+"]")
        let url = `/api/video_reviews/by-ids?reviewIds=${JSON.stringify(reviewIds)}`
        this.busy = true
        axios.get(url)
          .then((response) => {
            this.data = []
            response.data.data.forEach(element => {
              this.data.push(element)
            })
            this.isRestaurantInfoFoldeds = []
            this.isScrollDisabled = true
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.busy = false
          })
      } else {
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
        
        let url = `/api/video_reviews?randomSeed=${this.randomSeed}&prevLoaded=${prevLoaded}&prevLoadedLength=${this.data.length}`;
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
      }
    },
    handleEvent: function(event) {
      this.isNext = false
      const {tpoCategory} = event
      
      if(tpoCategory === 'pin') {
        this.isPin = true
      } else {
        this.isPin = false
        this.tpoCategory = tpoCategory
        this.data = []
      }
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
    },
    createRandomSeed() {
      this.randomSeed = Math.floor(Math.random() * 100)
    } 
  }
}
</script>

<style>

</style>