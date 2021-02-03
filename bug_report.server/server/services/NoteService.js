import { dbContext } from '../db/DbContext'

class NoteService {
  async getAll(query = {}) {
    return await dbContext.Notes.find(query).populate('creator')
  }

  async getOne(id) {
    return await dbContext.Notes.findById(id)
  }

  async create(body) {
    const test = await dbContext.Notes.create(body)
    return test
  }

  async edit(id, body) {
    const editData = await dbContext.Notes.findByIdAndUpdate(id, body)
    return editData
  }

  async delete(id) {
    return await dbContext.Notes.findOneAndDelete(id)
  }
}

export const noteService = new NoteService()
