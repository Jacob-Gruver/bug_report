<template>
  <div class="Comments container-fluid">
    <div class="row">
      <div class="col">
        <h1>
          {{ commentProp.title }}
        </h1>
        <button class="btn btn-secondary">
          btn
        </button>
        <p>
          <!-- {{ commentProp.description }} -->
          <!-- {{ commentProp.id }} -->
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comments',
  props: {
    commentProp: {
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
