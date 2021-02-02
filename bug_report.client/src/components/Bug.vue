<template>
  <div class="Bugs container-fluid">
    <router-link :to="{ name: 'BugDetails', params: { id: bugProp } }">
      <div class="row">
        <div class="col">
          <h1>
            {{ bugProp.title }}
          </h1>
          <p>
            {{ bugProp.description }}
            {{ bugProp.id }}
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
