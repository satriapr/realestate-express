import { IBuilder } from '../types/BuilderType'
import BuilderModel from '../models/BuilderModel'
import Constant from '../constants/Constant'

interface IBuilderService {
  findBuilders(name: string, limit?: number): Promise<IBuilder[]>
  saveBuilder(
    name: string,
    description: string,
  ): Promise<void>
  removeBuilder(_id: string): Promise<void>
}

// Query and business logic
class BuilderService implements IBuilderService {
  // Find active record
  async findBuilders(name: string, limit?: number): Promise<IBuilder[]> {
    const response = await BuilderModel.find({
      active: 1,

      // if empty, don't include
      ...(name ? { 
        name: { 
          $regex: name, 
          $options: 'i' // case insensitive
        } 
      } : {}),
    })
      .sort({ createdAt: -1 })
      .limit(limit || Constant.DEFAULT_PER_PAGE)
    return response
  }

  // Create new record
  async saveBuilder(
    name: string,
    description: string
  ) {
    const newBuilderModel = new BuilderModel({
      name,
      description,
      active: 1,
    })

    await newBuilderModel.save()
  }

  // Soft delete
  async removeBuilder(_id: string) {
    await BuilderModel.findByIdAndUpdate(_id, { active: 0 })
  }
}

export default BuilderService
