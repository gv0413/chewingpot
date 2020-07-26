<template>
  <div>
    <div v-if="isRestaurantMenusLoaded">
      메뉴
      <div v-for="(restaurantMenu,i) in restaurantMenus" :key="i">
        {{restaurantMenu.name}}-{{restaurantMenu.price}}
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      restaurantMenus: [],
      isRestaurantMenusLoaded: false,
    }
  },
  computed: {
    restaurantId: function() {
      return this.$route.params.restaurantId
    }
  },
  created() {
    this.loadMenu()
  },
  methods: {
    loadMenu: function() {
      let url = `http://127.0.0.1:3000/restaurants/${this.restaurantId}/menus`
      axios.get(url)
      .then((response) => {
        for(let i=0; i<response.data.data.length; i++) {
          this.restaurantMenus[i] = response.data.data[i]
        }
        this.isRestaurantMenusLoaded = true
      })
      .catch((error) => {
        console.log(error);
        this.isRestaurantMenusLoaded = true
      })
    }
  }
}
</script>

<style>

</style>