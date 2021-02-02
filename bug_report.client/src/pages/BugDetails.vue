<template>
  <div class="bugdetails container-fluid">
    <div class="row">
      <div class="col">
        <button class="btn btn-danger" @click="state.editBug = true">
          edit
        </button>
      </div>
      <div class="col" :contenteditable="state.editBug" @blur="editBug($event)">
        <h1>
          Bug Details Page
        </h1>
        <h2>
          {{ state.bug.title }}
        </h2>
        <p>
          {{ state.bug.description }} - {{ state.bug.id }}
        </p>
        <p>
          Edited since: {{ state.bug.updatedAt }}
        </p>
        <p>
          Closed: {{ state.bug.closed }}
        </p>
      </div>
      <button class="btn btn-warning" @click="editBugStatus(editedBugStatus)">
        close
      </button>
      <Comments v-for="comment in state.comments" :key="comment.id" :comment-prop="comment" />
    </div>
  </div>
  <div class="row">
    <div class="col">
      <form>
        <input type="text"
               name="content"
               title="content"
               class="form-control"
               placeholder="Note Content"
               v-model="state.newComment.content"
        >
        <button type="button" class="btn btn-success" @click="addComment">
          Add a Note
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { bugDetailsService } from '../services/BugDetailsService'
import { logger } from '../utils/Logger'
export default {
  name: 'BugDetails',
  setup() {
    const state = reactive({
      bug: computed(() => AppState.bug),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      editBug: false,
      editedBugStatus: 'closed',
      newComment: {}

    })
    onMounted(() => {
      try {
        const res = bugDetailsService.getComments(state.bug.id)
        logger.log(res)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      async editBug(e) {
        bugDetailsService.editBug(e.innerText, state.bug.id, state.bug.closed, state.account.email)
      },
      async editBugStatus(status) {
        try {
          bugDetailsService.editBugStatus(status, state.bug.id)
        } catch (error) {
          logger.error(error)
        }
      },
      async addComent() {
        try {
          bugDetailsService.addNewComment(state.bug.id, state.newComment)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
// :contenteditable="state.editComments" @blur="editComment($event, comment.id)"
</script>

<style lang="scss" scoped>

</style>
