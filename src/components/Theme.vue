<template>
  <div>
    <div :class="{ scrolled: !view.atTopOfPage }" class="container pb-10px between-component chewingpick">
      <header class="wrap header bc-white">
        <a href="/">
          <img src="../assets/img/logo-name.png" alt="" class="logo">
        </a>
        <button class="mr-10 theme-btn" 
                @click="sendPin()"
                style="float: right"
                :class="{on: tpoCategory === 'pin'}"><i class="fas fa-bookmark"></i></button>
      </header>
      <nav class="wrap mb-05 pt-05 scroll-x">
        <label for="">
          <select name="time" v-model="selectedTime" class="select t-primary">
            <option value="morning">아침</option>
            <option value="afternoon">점심</option>
            <option value="evening">저녁</option>
            <option value="total">전체</option>
          </select>
        </label>
        <button v-for="(tc, i) in tpoCategories" 
                :key="i" 
                @click="sendTPO(i)"
                class="mr-10px theme-btn"
                :class="{ on: tpoCategory === tc }"
                >
                {{tc}}
        </button>
      </nav>
    </div>
  </div>

  
</template>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      tpoCategories: [],
      tpoCategory: '',
      isTPOCategoriesLoaded: false,
      view: {
        atTopOfPage: true
      },
      currentIndex: undefined,
      selectedTime: this.getSelectedTime(new Date().getHours())
    }
  },
  props: {
    isNext: {
      type: Boolean
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  created() {
    this.loadTPO();
  },
  watch: {
    isNext : function(val){
      if (val) {
        this.sendTPO((this.currentIndex + 1) % this.tpoCategories.length)
        //NOTE : isNext가 바뀌면 다음 인덱스로 
      }
    },
    selectedTime: function(val) {
      if (val) {
        this.loadTPO()
      }
    }
  },
  methods: {
    loadTPO: function() {
      let url = `/api/tpo_categories?time=${this.selectedTime}`
      axios.get(url)
        .then((response) => {
          this.tpoCategories = response.data.data.tpo_categories
          this.isTPOCategoriesLoaded = true
        })
        .catch((error) => {
          console.log(error);
          this.isTPOCategoriesLoaded = true
        })
    },
    sendTPO: function(tpoCategoryIndex) {
      this.tpoCategory = this.tpoCategories[tpoCategoryIndex]
      this.currentIndex = tpoCategoryIndex
      const parameter = {tpoCategory: this.tpoCategory}
      this.$emit('parent', parameter)
      // eslint-disable-next-line no-undef
      fbq('track', 'Search', {
        search_string: String(this.tpoCategory),
      })
    },
    sendPin: function() {
      this.tpoCategory = 'pin'
      const parameter = {tpoCategory: this.tpoCategory}
      this.$emit('parent', parameter)
    },
    handleScroll(){
      // when the user scrolls, check the pageYOffset
      if(window.pageYOffset>0){
          // user is scrolled
          if(this.view.atTopOfPage) this.view.atTopOfPage = false
      }else{
          // user is at top of page
          if(!this.view.atTopOfPage) this.view.atTopOfPage = true
      }
    },
    getSelectedTime(hour) {
      if( hour >= 5 && hour <= 11 ){
        return 'morning'
      } else if(hour >= 12 && hour <= 16) {
        return 'afternoon'
      } else if((hour >= 17 && hour <=23) || (hour >= 0 && hour <=2)){
        return 'evening'
      } else {
        return 'total'
      }
    }
  }
}
</script>

<style>
</style>