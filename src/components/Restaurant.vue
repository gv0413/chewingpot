<template>
  <div>
    <button @click="loadData">Load</button>
    {{restaurantInfos.length}}
    {{isLoaded}}
    <div v-if="isLoaded">
      <div v-for="(restaurantInfo, i) in restaurantInfos" :key="i">
        Name: {{restaurantInfo.name}}
        Location: {{restaurantInfo.location}}
      </div>
    </div>
    <div v-else>
      No data
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function() {
    return {
      restaurantNames : [],
      restaurantLocations : [],
      restaurantInfos: [],
      isLoaded: false,
    }
  },
  methods: {
    loadData: function() {
      var url = 'http://127.0.0.1:3000/restaurants';
      axios.get(url)
        .then((response) => {
          console.log(response.data.data[0]);
          for(let i in response.data.data) {
            this.restaurantNames[i] = response.data.data[i].name
            this.restaurantLocations[i] = response.data.data[i].location
            this.restaurantInfos[i] = response.data.data[i]
            this.isLoaded = true
            console.log(this.restaurantInfos)
          }
        })
        .catch((error) => {
          console.log(error);
          this.dummyData = 'Data를 찾을 수 없습니다.'
        })
    }
  }
}
</script>

<style>

</style>