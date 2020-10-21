<template>
  <div class="container pt-10px">
    <div class="wrap">
      <div class="review-info-wrap">
        <div>
          <img class="channel-img" :src="reviewInfo.channels.thumbnail_url" width="50px"><br>
        </div>
        <div class="width-100 flex column">
          <div class="flex">
            <p class="review-title t_bk width-100">{{reviewInfo.title}}</p>
            <i id="kakao-link-btn" class="fas fa-share-alt t-primary share" @click="sendLink"></i>
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
      <span v-for="(keyword, i) in keywords" :key="i">
        <span v-if="keyword.is_tpo==true" class="tag-container f13" >
          <span class="tag">#{{keyword.name}}</span>
        </span>
      </span>
      <hr class="border-gry mt-5px">
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
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: this.reviewInfo.restaurants.name,
          description: this.reviewInfo.title,
          imageUrl: this.reviewInfo.thumbnail_url,
          link: {
            mobileWebUrl: `https://youtube.com/watch?v=${this.reviewInfo.youtube_id}`,
            webUrl: `https://youtube.com/watch?v=${this.reviewInfo.youtube_id}`,
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
              mobileWebUrl: `https://youtube.com/watch?v=${this.reviewInfo.youtube_id}`,
              webUrl: `https://youtube.com/watch?v=${this.reviewInfo.youtube_id}`,
            },
          },
          {
            title: '지도 보기',
            link: {
              mobileWebUrl: `https://map.kakao.com/link/map/${this.reviewInfo.restaurants.kakaomap_id}`,
              webUrl: `https://map.kakao.com/link/map/${this.reviewInfo.restaurants.kakaomap_id}`,
            },
          },
        ],
      })
    }
  }
}
</script>

<style>

</style>