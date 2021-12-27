import { IProject } from '../types/ProjectType'
import { model, Schema } from 'mongoose'

const projectSchema: Schema = new Schema<IProject>(
  {
    builder: { type: Schema.Types.ObjectId, ref: 'Builder' },
    city: { type: Schema.Types.ObjectId, ref: 'City' },
    name: String,
    description: String,
    type: String,
    price: Number,
    location: String,
    amenities: String,
    active: Number,
  },
  { collection: 'project', timestamps: true}
)
projectSchema.index({ name: 1 })

export default model<IProject>('Project', projectSchema)
