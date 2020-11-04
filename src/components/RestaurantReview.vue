<template>
  <article class="container pt-10px">
    <figure class="wrap">
      <div class="review-info-wrap">
        <div>
          <img class="channel-img" :src="reviewInfo.channels.thumbnail_url" width="50px"><br>
        </div>
        <div class="width-100 flex column">
          <div class="flex">
            <h6 class="review-title t_bk width-100 font-weight-400">{{reviewInfo.title}}</h6>
            <i id="kakao-link-btn" class="fas fa-share-alt t-primary share" @click="[sendLink(), addShareFbq(reviewInfo)]"></i>
            <a href="javascript:void(0);" class="chewing-pin-wrap" @click="togglePinId(reviewInfo.id, reviewInfo.title)">
              <i :class="{'t-primary': isPin, 't-secondary': !isPin}" class="fas fa-bookmark chewing-pin"></i>
            </a>
          </div>
          <div>
            <p class="left t_dgray">{{reviewInfo.channels.name}}</p>
            <p class="right t_dgray">{{reviewInfo.upload_date.split('T')[0]}}</p>
          </div>
        </div>
      </div>
      <youtube class="mt-1 width-100" :video-id="reviewInfo.youtube_id" ref="youtube" @playing="playing" :fitParent="true" :resize="true" :player-vars="playerVars" />
      <div class="chewing-time-btn-wrap">
        <div v-for="(keyword, i) in keywords" :key="i">
          <button v-if="keyword.video_time" class="pr-05 pl-05 chewing-time-btn" 
                  @click="[seekTo(timeToNumber(keyword.video_time), keyword.name), addViewContentFbq(reviewInfo.id, reviewInfo.title, keyword.id, keyword.name)]">{{keyword.name}} </button>
        </div>
        <div v-if="keywords.length==0">
          <p class="text-center empty-chewing-time"> 등록된 메뉴 정보가 없습니다.</p>
        </div>
      </div>
      <hr class="border-gry" style="clear:both;">
    </figure>
  </article>
</template>

<script>
export default {
  props: {
    reviewInfo: {
      type: Object
    },
    index: {
      type: Number
    },
    currentPlayingReviewId: {
      type: String
    }
  },
  data: function() {
    return {
      isShowable: false,
      playerVars: {
        playsinline: 1,
        origin: window.location.origin,
        host: `${window.location.protocol}//www.youtube.com`,
      },
      isPin: false,
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    },
    keywords() {
      return this.reviewInfo.keywords
    },
    reviewInfoId() {
      return this.reviewInfo.id
    }
  },
  created() {
    
  },
  mounted() {
    this.isPinned(this.reviewInfoId)
  },
  watch: {
    reviewInfoId(val) {
      if (val) {
        this.isPinned(val)
      }
    },
    currentPlayingReviewId(val) {
      if (val && val !== this.reviewInfo.youtube_id) {
        this.player.pauseVideo()
      }
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
      // NOTE: playing된 리뷰의 id를 상위로 emit
      this.$emit('sendPlayingReviewId', this.reviewInfo.youtube_id)
    },
    timeToNumber(timeString) {
      const parsedString = timeString.split('T')[1].split(':')
      const hours = parsedString[0]
      const minutes = parsedString[1]
      const seconds = parsedString[2].split('.')[0]
      return parseInt(hours*3600) + parseInt(minutes*60) + parseInt(seconds);
    },
    togglePinId(id, title) {
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

      this.isPinned(id)
      
      if (pinIds.includes(id)){
        // eslint-disable-next-line no-undef
        fbq('track', 'AddToWishlist', {
          content_type: 'product',
          content_ids: [String(id)],
          content_name: title
        })
      }
    },
    isPinned(id) {
      let pinIds = []
      const localStorageKey = 'pinIds'
      if (localStorage.getItem(localStorageKey))
      pinIds = JSON.parse("["+localStorage.getItem(localStorageKey)+"]")
      const reviewIdx = pinIds.indexOf(id)
      if(reviewIdx === -1) {
        this.isPin = false
      } else {
        this.isPin = true
      }
    },
    addViewContentFbq(reviewId, reviewTitle, keywordId, keywordName) {
      // eslint-disable-next-line no-undef
      fbq('track', 'ViewContent', {
        review_id : reviewId,
        review_title: reviewTitle,
        keyword_id: keywordId,
        content_name: keywordName
      })
    },
    sendLink() {
      let kakaoMapUrl
      if (this.reviewInfo.restaurants) {
        kakaoMapUrl = `https://map.kakao.com/link/map/${this.reviewInfo.restaurants.kakaomap_id}`
      } else {
        kakaoMapUrl = `https://map.kakao.com/link/search/식당 정보가 없습니다.`
      }
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: (this.reviewInfo.restaurants || {}).name || '츄잉팟',
          description: this.reviewInfo.title,
          imageUrl: this.reviewInfo.thumbnail_url,
          link: {
            mobileWebUrl: `${process.env.VUE_APP_DOMAIN}/${this.reviewInfo.id}`,
            webUrl: `${process.env.VUE_APP_DOMAIN}/${this.reviewInfo.id}`,
          },
        },
        // social: {
        //   likeCount: 286,
        //   commentCount: 45,
        //   sharedCount: 845,
        // },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: `${process.env.VUE_APP_DOMAIN}/${this.reviewInfo.id}`,
              webUrl: `${process.env.VUE_APP_DOMAIN}/${this.reviewInfo.id}`,
            },
          },
          {
            title: '지도 보기',
            link: {
              mobileWebUrl: kakaoMapUrl,
              webUrl: kakaoMapUrl,
            },
          },
        ],
      })
    },
    addShareFbq(sharedReviewInfo) {
      // TODO: _removed_값 해결되면 이벤트 바꿔야 합니다
      // eslint-disable-next-line no-undef
      fbq('track', 'CompleteRegistration', {
        value: sharedReviewInfo.id,
        content_name: sharedReviewInfo.title,
      })
    }
  }
}
</script>

<style>

</style>