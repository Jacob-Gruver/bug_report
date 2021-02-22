import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const Note = new Schema({
  content: { type: String, required: true },
  bug: { type: ObjectId, ref: 'Bug', required: true },
  // TODO check why bugs isnt also being autofilled
  flagged: { type: String, enum: ['pending', 'completed', 'rejected'], default: 'pending' },
  creatorEmail: { type: String, ref: 'Account', required: true }
  // TODO check why creatorEmail only is autofilled in bugs and why doesn't it work on notes
},
{ timestamps: true, toJSON: { virtuals: true } })

Note.virtual('creator', {
  localField: 'creatorEmail',
  ref: 'Account',
  foreignField: 'email',
  justOne: true
})

export default Note
