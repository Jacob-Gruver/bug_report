import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const noteApi = '/api/notes'
const bugApi = '/api/bugs'

class BugDetailsService {
  async getBug(id) {
    try {
      const res = await api.get(bugApi + '/' + id)
      logger.log('get bug from the details service', res)
      AppState.bug = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getComments(id) {
    try {
      const res = await api.get(bugApi + '/' + id + '/notes')
      AppState.comments = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async editBugTitle(event, id, status) {
    try {
      if (status === false) {
        debugger
        const editB = { title: event }
        await api.put(bugApi + '/' + id, editB)
      }
    } catch (error) {
      logger.error(error)
    }
  }

  async editBugDescription(event, id, status) {
    try {
      if (status === false) {
        debugger
        const editB = { description: event }
        await api.put(bugApi + '/' + id, editB)
      }
    } catch (error) {
      logger.error(error)
    }
  }

  async editBugStatus(status, id) {
    try {
      debugger
      const newStatus = await api.put(bugApi + '/' + id, status)
      this.getBug(id)
      logger.log(newStatus)
    } catch (error) {
      logger.error(error)
    }
  }

  async addNewComment(newComment) {
    try {
      const res = await api.post(noteApi, newComment)
      AppState.comments.push(res.data)
      logger.log('add new comment', res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async removeComment(id) {
    try {
      debugger
      const res = await api.delete('/api/notes/' + id)
      AppState.comments = AppState.comments.filter(i => i.id !== id)

      logger.log(res)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const bugDetailsService = new BugDetailsService()
