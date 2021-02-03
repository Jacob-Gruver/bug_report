import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugService } from '../services/BugService'
import { noteService } from '../services/NoteService'
import BaseController from '../utils/BaseController'

export class BugController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getOne)
      .get('/:id/notes', this.getNotes)
      // NOTE this route is good
      .post('', this.create)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      return res.send(await bugService.getAll(req.query))
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      return res.send(await bugService.getOne(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async getNotes(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      const noteData = await noteService.getAll({ bug: req.params.id })
      return res.send(noteData)
    } catch (error) {

    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      return res.send(await bugService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      return res.send(await bugService.edit(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }
}
