import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const bugApi = '/api/bugs/'

class BugDetailsService {
  async editBug(event, id, status, auth) {
    try {
      if (status === false) {
        const editB = { title: event.title, description: event.description, creatorEmail: auth }
        await api.put(bugApi + id, editB)
      }
    } catch (error) {
      logger.error(error)
    }
  }

  async getComments(bugId) {
    try {
      const res = await api.get(bugApi + bugId + '/notes')
      AppState.comments = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async addNewComment(bugId, newComment) {
    try {
      const res = await api.post(bugApi + bugId + '/notes', newComment)
      AppState.comment = res.data
    } catch (error) {
      logger.error(error)
    }
  }
}

export const bugDetailsService = new BugDetailsService()
