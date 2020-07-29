<template>
  <div id="map" style="width:500px;height:400px;"></div>
</template>

<script>
export default {
  mounted() { 
    window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
  },
  methods : { 
    initMap() { 
      var container = document.getElementById('map');
      var options = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), 
        level: 3 
      }; 
      var map = new kakao.maps.Map(container, options); //마커추가하려면 객체를 아래와 같이 하나 만든다. 
      var marker = new kakao.maps.Marker({ position: map.getCenter() }); 
      marker.setMap(map); 
    },
    addScript() { 
      const script = document.createElement('script'); /* global kakao */ 
      // const libraries = document.createElement('script');
      script.onload = () => kakao.maps.load(this.initMap); 
      // libraries.src = 'http://dapi.kakao.com/v2/maps/sdk.js?appkey=f08303d1b762e5f5a792163f5416e993&libraries=services,clusterer,drawing';
      script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f08303d1b762e5f5a792163f5416e993'; 
      document.head.appendChild(script); 
      // document.head.appendChild(libraries);
    },
  }
}
</script>

<style>

</style>