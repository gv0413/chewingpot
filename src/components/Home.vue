<template>
  <div class="background">
    <Theme @parent="handleEvent" v-bind:isNext="isNext"></Theme>
    <main>
      <section v-if="!isPin">
        <div v-for="(reviewInfo, i) in data" :key="i">
          <restaurantReview v-bind:reviewInfo="reviewInfo" @getSelectedKeywords="getSelectedKeywords"></restaurantReview>
          <restaurantInfo v-bind:reviewInfo="reviewInfo" v-bind:focusedInfoId="focusedInfoId" @sendOpenId="handleOpenEvent"></restaurantInfo>
        </div>
        <infinite-loading :identifier="infiniteId" @infinite="loadMore" class="text-center bc-white pt-1"></infinite-loading>
      </section>
      <section v-else>
        <div v-for="(reviewInfo, i) in data" :key="i">
          <restaurantReview v-bind:reviewInfo="reviewInfo"></restaurantReview>
          <restaurantInfo v-bind:reviewInfo="reviewInfo" v-bind:focusedInfoId="focusedInfoId" @sendOpenId="handleOpenEvent"></restaurantInfo>
        </div>
        <infinite-loading :identifier="infiniteId * 2" @infinite="loadPin" class="text-center bc-white pt-1">
          <p slot="spinner">Loading...</p>
          <p slot="no-more">No more Data :)</p>
        </infinite-loading>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import RestaurantReview from './RestaurantReview.vue'
import RestaurantInfo from './RestaurantInfo.vue'
import Theme from './Theme.vue'

export default {
  components: {
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
      infiniteId: +new Date(),
    }
  },
  metaInfo: function() {
    return{
      meta: [
        { name: 'description', content: '맛집을 찾아보는 과정부터 직접 먹는 그 순간까지 즐겁게!', vmid: 'description'},
        { property: 'og:description', content: '맛집을 찾아보는 과정부터 직접 먹는 그 순간까지 즐겁게!'},
        { property: 'og:title', content: '츄잉팟'}
      ]
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
    loadMore: function($state) {
      const dataIds = this.data.map(data => data.id)
      const prevLoaded = dataIds.slice(50 * (Math.floor(dataIds.length / 50))).join()
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
          if (!$state)  return
          response.data.data.forEach(element => {
            this.data.push(element)
          })
          this.isRestaurantInfoFoldeds = []
          this.prevData = response.data.data
          this.cursorId = this.data[this.data.length - 1].id
          this.selectedKeywords = ''

          if (this.prevData.length === 0) {
            $state.complete();
            const result = window.confirm('현재 카테고리의 모든 컨텐츠를 보셨습니다.\n다음 카테고리로 넘어가시겠습니까?');
            if (result) {
              this.isNext = true
              this.initParams()
            } else {
              this.prevData = [0]
            }
          } else {
            $state.loaded();
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.busy = false
        })
      
    },
    loadPin: function($state) {
      const reviewIds = JSON.parse("["+localStorage.getItem('pinIds')+"]")
      let url = `/api/video_reviews/by-ids?reviewIds=${JSON.stringify(reviewIds)}`
      this.busy = true
      this.data = []
      axios.get(url)
        .then((response) => {
          if (!$state)  return
          response.data.data.forEach(element => {
            this.data.push(element)
          })
          this.isRestaurantInfoFoldeds = []
          this.isScrollDisabled = true
          $state.complete();
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
      
      this.infiniteId += 1
      if(tpoCategory === 'pin') {
        this.isPin = true
        this.loadPin()
      } else {
        this.isPin = false
        this.tpoCategory = tpoCategory
        this.data = []
        this.loadMore()
      }
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