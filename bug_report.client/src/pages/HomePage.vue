<template>
  <div class="home flex-grow-1 d-flex flex-column">
    <!-- <img src="../assets/img/inGen.png" alt="CodeWorks Logo">
    <h1 class="my-5 bg-dark text-light p-3 rounded d-flex align-items-center">
      <span class="mx-2 text-white">Vue 3 Starter</span>
    </h1> -->
    <div class="row">
      <div class="col">
        <form>
          <div class="row p-2">
            <div class="col-xs-2">
              <input type="text"
                     name="title"
                     title="title"
                     class="form-control"
                     placeholder="Add Title"
                     data-maxlength="16"
                     v-model="state.newBug.title"
              >
            </div>
          </div>
          <div class="row p-2">
            <div class="col-xs-4">
              <input type="text"
                     name="description"
                     title="description"
                     class="form-control"
                     placeholder="Add description"
                     data-maxlength="150"
                     v-model="state.newBug.description"
              >
            </div>
          </div>
          <button type="button" @click="addNewBug" class=" pt-2">
            Create
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <!-- <button class="btn btn-outline-danger" @click="AllClosedBugs">
          All Closed Bugs
        </button> -->
      </div>
      <div class="col-12">
        <Bugs v-for="bug in state.bugs" :key="bug.id" :bug-prop="bug" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { homeService } from '../services/HomeService'
import { logger } from '../utils/Logger'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      account: computed(() => AppState.account),
      newBug: {

      }
    })
    onMounted(() => {
      try {
        homeService.getBugs()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      async addNewBug() {
        try {
          const _id = await homeService.addNewBug(state.newBug)
          router.push({ name: 'BugDetails', params: { id: _id } })
        } catch (error) {
          logger.error(error)
        }
      },
      async AllClosedBugs() {
        // homeService.AllClosedBugs()
        state.bugs.filter()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
  background-image: url(../assets/img/jplogo.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
