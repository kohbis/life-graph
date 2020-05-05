<template lang="pug">
  div.container
    vue-loading(
      type="beat"
      color="#F7BA2A"
      :size="{ width: '30px', height: '30px' }"
      )
</template>

<script>
import { VueLoading } from 'vue-loading-template'

export default {
  name: 'loading',
  components: {
    VueLoading,
  },
}
</script>
