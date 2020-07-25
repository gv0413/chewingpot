<template>
  <div>
    <search-form></search-form>
    <restaurant-cards></restaurant-cards>
  </div>
</template>

<script>
import SearchForm from './SearchForm.vue'
import RestaurantCards from './restaurant/RestaurantCards.vue'

export default {
  components: {SearchForm, RestaurantCards}
}
</script>

<style>

</style>