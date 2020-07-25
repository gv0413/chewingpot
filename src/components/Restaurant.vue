<template>
  <div>
    <div v-if="isLoaded">
      <div v-if="restaurantInfos && restaurantInfos.length">
        <div v-for="(restaurantInfo, i) in restaurantInfos" :key="i">
          <img src="http://via.placeholder.com/100x100" alt="sample img"> <br>
          Name: {{restaurantInfo.name}} <br>
          Location: {{restaurantInfo.location}} <br>
          category : {{restaurantInfo.category}} <br>
          contact : {{restaurantInfo.contact}}
        </div>
      </div>
      <div v-else>
        No data
      </div>
    </div>
    <div v-else>
      Loadding...
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function() {
    return {
      restaurantInfos: [],
      isLoaded: false,
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData: function() {
      var url = 'http://127.0.0.1:3000/restaurants';
      axios.get(url)
        .then((response) => {
          console.log(response.data.data[0]);
          for(let i in response.data.data) {
            this.restaurantInfos[i] = response.data.data[i]
            this.isLoaded = true
            console.log(this.restaurantInfos)
          }
        })
        .catch((error) => {
          console.log(error);
          this.isLoaded = true
          this.dummyData = 'Data를 찾을 수 없습니다.'
        })
    },
  }
}
</script>

<style>

</style>