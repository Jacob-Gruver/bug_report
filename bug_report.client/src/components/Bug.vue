<template>
  <div class="Bugs card container">
    <router-link :to="{ name: 'BugDetails', params: { id: bugProp.id } }">
      <div class="row">
        <div class="col-3">
          <h1 v-if="bugProp.closed !== true">
            {{ bugProp.title }}
          </h1>
        </div>
        <!-- <div class="col-3">
          <p :class="v-if">
            Yellow
          </p>
        </div> -->
        <div class="col-3">
          <p v-if="bugProp.closed === true" class="text-danger mt-3">
            {{ bugProp.title }}
          </p>
        </div>
        <div class="col-3">
          <p v-if="bugProp.closed !== true">
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
