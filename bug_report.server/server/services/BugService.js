// import { query } from 'express'
import { dbContext } from '../db/DbContext'

class BugService {
  async getAll(query = {}) {
    const res = await dbContext.Bugs.find(query).populate('creator')
    return res
  }

  async getOne(id) {
    return await dbContext.Bugs.findById(id)
  }

  async create(body) {
    const res = await dbContext.Bugs.create(body)
    return res
  }

  async edit(id, body) {
    const editData = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: body.creatorEmail }, body, { new: true })
    // NOTE use findOneand update
    return editData
  }

  async getClosed(query = {}) {
    const closed = await dbContext.Bugs.find(query)
    return closed
  }
}

export const bugService = new BugService()
