<template lang="pug">
  div.container
    vue-loading(
      type="beat"
      color="#F7BA2A"
      :size="{ width: '30px', height: '30px' }"
      )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { VueLoading } from 'vue-loading-template';

@Component({
  components: {
    VueLoading,
  }
})
export default class Loading extends Vue {}
</script>
