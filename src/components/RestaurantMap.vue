<template>
  <div>
    <div id="map" style="width:100%; height:180px;"></div>
    <!-- TODO : 다른 컴포넌트에서도 열리게 수정 필요 -->
    <!-- <button>
      <a :href="`https://m.map.kakao.com/actions/searchView?q=${addressQuery}#!/MOPPPU,QNOMQLO/map/place`" target="_blank"> 카카오맵으로 이동</a>
    </button> -->
  </div>
</template>

<script>
export default {
  props: {
    restaurantInfo: {
      type: Object,
    }
  },
  data: function() {
    return {
      addressQuery : this.restaurantInfo.location.split(' ').join('+'),
    }
  },
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
      var geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(`${this.restaurantInfo.location}`, (result, status) => {
      // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
              map: map,
              position: coords
          });
          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:6px 0;">${this.restaurantInfo.name}</div>`
          });
          infowindow.open(map, marker);
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        } 
      });
    },
    addScript() { 
      const script = document.createElement('script'); /* global kakao */ 
      script.onload = () => kakao.maps.load(this.initMap); 
      script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f08303d1b762e5f5a792163f5416e993&libraries=services'; 
      document.head.appendChild(script);
    },
  }
}
</script>

<style>

</style>