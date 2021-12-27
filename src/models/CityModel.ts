import { ICity } from '../types/CityType'
import { model, Schema } from 'mongoose'

const citySchema: Schema = new Schema<ICity>(
  {
    name: String,
    country: String,
    active: Number,
  },
  { collection: 'city', timestamps: true }
)
citySchema.index({ name: 1 })

export default model<ICity>('City', citySchema)
