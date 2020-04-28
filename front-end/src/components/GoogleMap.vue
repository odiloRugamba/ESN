<template>
    <GmapMap
      :center="center"
      :zoom="12"
      style="width: 100%; height: 300px;"
    >
      <GmapMarker
        :position="center"
      />
    </GmapMap>
</template>

<script>

import {gmapApi} from 'vue2-google-maps';

export default {
  name: "GoogleMap",
  props: [ 'location' ],
  data() {
    return {
    };
  },
  computed: {
    google: gmapApi,
    center: function() {
      return this.google && new this.google.maps.LatLng(this.location.lat, this.location.lng);
    }
  },
};
</script>