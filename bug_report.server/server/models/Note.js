import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const Note = new Schema({
  content: { type: String, required: true },
  bug: { type: ObjectId, ref: 'Bug', required: true },
  flagged: { type: String, enum: ['pending', 'completed', 'rejected'], default: 'pending' },
  creatorEmail: { type: String, ref: 'Account', required: true }
},
{ timestamps: true, toJSON: { virtuals: true } })

Note.virtual('creator', {
  localField: 'creatorEmail',
  ref: 'Account',
  foreignField: 'email',
  justOne: true
})

export default Note
