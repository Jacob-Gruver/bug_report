<template>
  <div class="Bugs container-fluid">
    <router-link :to="{ name: 'BugDetails', params: { id: bugProp.id } }">
      <!-- NOTE change color on this router link if its closed -->
      <div class="row">
        <div class="col">
          <h1>
            {{ bugProp.title }}
          </h1>
          <p>
            {{ bugProp.id }}
          </p>
          <p v-if="bugProp.closed === true" class="text-danger">
            Bug Closed {{ bugProp.title }}
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Bugs',
  props: {
    bugProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
