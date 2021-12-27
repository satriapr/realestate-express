import { IProject } from '../types/ProjectType'
import ProjectModel from '../models/ProjectModel'
import CityModel from '../models/CityModel'
import BuilderModel from '../models/BuilderModel'
import Constant from '../constants/Constant'

interface IProjectService {
  findProjects(name: string, limit?: number): Promise<IProject[]>
  saveProject(
    builder: object,
    city: object,
    name: string,
    description: string,
    type: string,
    price: string,
    location: string,
    amenities: string
  ): Promise<void>
  removeProject(_id: string): Promise<void>
}

// Query and business logic
class ProjectService implements IProjectService {
  // Find active record
  async findProjects(name: string, limit?: number): Promise<IProject[]> {
    const response = await ProjectModel.find({
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
      .populate('city', 'name country', CityModel)
      .populate('builder', 'name description', BuilderModel)
    return response
  }

  // Create new record
  async saveProject(
    builder: object,
    city: object,
    name: string,
    description: string,
    type: string,
    price: string,
    location: string,
    amenities: string
  ) {
    const newProjectModel = new ProjectModel({
      builder,
      city,
      name,
      description,
      type,
      price,
      location,
      amenities,
      active: 1,
    })

    await newProjectModel.save()
  }

  // Soft delete
  async removeProject(_id: string) {
    await ProjectModel.findByIdAndUpdate(_id, { active: 0 })
  }
}

export default ProjectService
