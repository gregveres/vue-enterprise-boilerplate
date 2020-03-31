---
to: "src/components/<%= h.changeCase.kebab(name).toLowerCase().slice(0, 5) === 'base-' ? '_' : '' %><%= h.changeCase.kebab(name) %>.vue"
---
<%
if (blocks.indexOf('script') !== -1) {
%><script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: '<%= name %>',
  props: {}, // this is needed to ensure that vue-test-utils.mount takes this as a properly typed component
  setup() {
  }<% if (blocks.indexOf('template') === -1) {%>,
  render(h) {
    return <div/>
  }<% } %>
});
</script>
<%
}

if (blocks.indexOf('template') !== -1) {
%>
<template>
  <div>
  </div>
</template>
<%
}

if (blocks.indexOf('style') !== -1) {
%>
<style lang="scss" module>
@import '@design';
</style><%
}
%>
