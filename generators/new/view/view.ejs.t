---
to: "src/router/views/<%= h.changeCase.kebab(name) %>.vue"
---
<%
  const fileName = h.changeCase.kebab(name)
  const importName = h.changeCase.pascal(fileName)
  const titleName = h.changeCase.title(name)
%><script>
import { defineComponent } from '@vue/composition-api';
import Layout from '@layouts/main.vue'

export default defineComponent({
  page: {
    title: '<%= titleName %>',
    meta: [{ name: 'description', content: 'The <%= titleName %> page.' }],
  },
  components: { Layout },
  Setup() {

  }
});
</script>

<template>
  <Layout>
    <%= titleName %>
  </Layout>
</template>
<%

if (useStyles) { %>
<style lang="scss" module>
@import '@design';
</style>
<% } %>
