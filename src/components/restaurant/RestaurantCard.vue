<template>
  <div>
    <img src="http://via.placeholder.com/100x100" alt="sample img"> <br>
    Name: {{restaurantInfo.name}} <br>
    Location: {{restaurantInfo.location}} <br>
    category : {{restaurantInfo.category}} <br>
    contact : {{restaurantInfo.contact}} <br>
  </div>
</template>

<script>
export default {
  props: {
    restaurantInfo : {
      type: Object,
    }
  },
}
</script>

<style>

</style>