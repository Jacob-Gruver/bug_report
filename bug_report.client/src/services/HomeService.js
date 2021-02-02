import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const bugApi = '/api/bugs'

class HomeService {
  async getBugs() {
    try {
      const res = await api.get(bugApi)
      AppState.bugs = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async addNewBug(newBug) {
    try {
      const res = await api.post(bugApi + '/', newBug)
      AppState.bug = res.data
      return res.data.id
    } catch (error) {
      logger.error(error)
    }
  }
}

export const homeService = new HomeService()
