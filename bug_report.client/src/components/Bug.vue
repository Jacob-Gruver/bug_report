<template>
  <div class="Bugs border container justify-content-around m-5">
    <router-link :to="{ name: 'BugDetails', params: { id: bugProp.id } }">
      <div class="row">
        <div class="col-3">
          <h1 v-if="bugProp.closed !== true">
            {{ bugProp.title }}
          </h1>
          <p v-else class="text-danger mt-3">
            {{ bugProp.title }}
          </p>
        </div>
        <div class="col-3">
          <p v-if="bugProp.closed !== true">
            Id: {{ bugProp.id }}
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
