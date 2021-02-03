<template>
  <div class="Comments container-fluid">
    <div class="row">
      <div class="col">
        <h5>
          {{ commentProp.content }}
        </h5>
        <p>
          {{ commentProp.flagged }}
        </p>
        <div class="row">
          <div class="col">
            <button type="button" class="btn btn-danger mx-2" data-toggle="modal" data-target="#model2">
              Remove
            </button>
            <!-- Button trigger modal -->

            <!-- Modal -->
            <div class="modal fade"
                 id="model2"
                 tabindex="-1"
                 role="dialog"
                 aria-labelledby="modelTitleId"
                 aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">
                      Modal title
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    Are You Sure?
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-grey" data-dismiss="modal">
                      Cancel
                    </button>
                    <button type="button" class="btn btn-danger" @click="removeComment(commentProp.id)">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <button @click="editFlagged({flagged: 'pending'})" class="btn btn-secondary mx-2">
                Pending
              </button>
              <button @click="editFlagged({flagged: 'completed'})" class="btn btn-secondary mx-2">
                Completed
              </button>
              <button @click="editFlagged({flagged: 'rejected'})" class="btn btn-secondary mx-2">
                Rejected
              </button>
            </div>
            <p>
              {{ commentProp.id }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { logger } from '../utils/Logger'
import { bugDetailsService } from '../services/BugDetailsService'
export default {
  name: 'Comments',
  props: {
    commentProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    onMounted(() => {
    })
    return {
      // async editFlagged(choice) {

      // }
      async removeComment(id) {
        try {
          bugDetailsService.removeComment(id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
