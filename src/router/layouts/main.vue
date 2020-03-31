<script>
import { defineComponent } from '@vue/composition-api';
import NavBar from '@components/nav-bar.vue';

export default defineComponent({
  components: { NavBar },
  setup() {
    /* empty */
  },
});
</script>

<template>
  <div :class="$style.container">
    <NavBar />
    <slot />
  </div>
</template>

<style lang="scss" module>
@import '@design';

.container {
  min-width: $size-content-width-min;
  max-width: $size-content-width-max;
  margin: 0 auto;
}
</style>
