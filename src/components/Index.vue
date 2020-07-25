<template>
  <div>
    <SearchForm></SearchForm>
    <RestaurantCard></RestaurantCard>
  </div>
</template>

<script>
import SearchForm from './SearchForm'
import RestaurantCard from './restaurant/RestaurantCard'

export default {
  components: {SearchForm, RestaurantCard}
}
</script>

<style>

</style>