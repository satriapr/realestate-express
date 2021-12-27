import { IBuilder } from '../types/BuilderType'
import { model, Schema } from 'mongoose'

const builderSchema: Schema = new Schema<IBuilder>(
  {
    name: String,
    description: String,
    active: Number,
  },
  { collection: 'builder', timestamps: true }
)
builderSchema.index({ name: 1 })

export default model<IBuilder>('Builder', builderSchema)
