// import { Auth0Provider } from '@bcwdev/auth0provider'
import { noteService } from '../services/NoteService'
import BaseController from '../utils/BaseController'

export class NoteController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .get('', this.getAll)
      // .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getOne)
      .post('/', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      return res.send(await noteService.getAll(req.query))
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      // req.body.creatorEmail = req.userInfo.name
      return res.send(await noteService.getOne(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // req.body.creatorEmail = req.userInfo.email
      const out = res.send(await noteService.create(req.body))
      return out
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      // req.body.creatorEmail = req.userInfo.email
      return res.send(await noteService.edit(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      // req.body.creatorEmail = req.userInfo.email
      return res.send(await noteService.delete(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
