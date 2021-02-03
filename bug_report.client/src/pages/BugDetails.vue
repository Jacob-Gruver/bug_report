<template>
  <div class="bugdetails container-fluid">
    <div class="row">
      <div class="col">
        <button v-if="state.bug.closed === false" class="btn btn-danger" @click="state.editBug = true">
          edit
        </button>
      </div>
      <div class="col">
        <h2 v-if="state.bug.closed === false" :contenteditable="state.editBug" @blur="editBugTitle($event)">
          {{ state.bug.title }}
        </h2>
        <p v-if="state.bug.closed === false" :contenteditable="state.editBug" @blur="editBugDescription($event)">
          {{ state.bug.description }}
        </p>
        <p>
          {{ state.bug.updatedAt }}
        </p>
        <h2 v-if="state.bug.closed !== false" class="text-danger">
          Bug closed
        </h2>
      </div>
      <button v-if="state.bug.closed === false" class="btn btn-warning" type="button" data-toggle="modal" data-target="#modelId">
        close
      </button>
      <div class="modal fade"
           id="modelId"
           tabindex="-1"
           role="dialog"
           aria-labelledby="modelTitleId"
           aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Are You Sure?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Cancel
              </button>
              <button type="button" class="btn btn-primary" @click="editBugStatus({closed: true})" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

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
import { useRoute } from 'vue-router'
export default {
  name: 'BugDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      bug: computed(() => AppState.bug),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      editBug: false,
      newComment: {}

    })
    onMounted(() => {
      logger.log('logging comments', state.comments)
      try {
        const res = bugDetailsService.getBug(route.params.id)
        logger.log('on mounted get bug', res)
      } catch (error) {
        logger.error(error)
      }
      try {
        const res = bugDetailsService.getComments(route.params.id)
        logger.log(res)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      async editBugTitle(e) {
        bugDetailsService.editBugTitle(e.target.innerText, state.bug.id, state.bug.closed)
      },
      async editBugDescription(e) {
        bugDetailsService.editBugDescription(e.target.innerText, state.bug.id, state.bug.closed)
      },
      async editBugStatus(status) {
        try {
          bugDetailsService.editBugStatus(status, state.bug.id)
        } catch (error) {
          logger.error(error)
        }
      },
      async addComment() {
        try {
          bugDetailsService.addNewComment({ content: state.newComment.content, bug: route.params.id, creatorEmail: state.account.email })
          logger.log(state.newComment.content, route.params.id, state.account.email)
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
