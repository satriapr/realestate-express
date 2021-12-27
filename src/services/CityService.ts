import { ICity } from '../types/CityType'
import CityModel from '../models/CityModel'
import Constant from '../constants/Constant'

interface ICityService {
  findCities(name: string, limit?: number): Promise<ICity[]>
  saveCity(
    name: string,
    country: string,
  ): Promise<void>
  removeCity(_id: string): Promise<void>
}

// Query and business logic
class CityService implements ICityService {
  // Find active record
  async findCities(name: string, limit?: number): Promise<ICity[]> {
    const response = await CityModel.find({
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
  async saveCity(
    name: string,
    country: string
  ) {
    const newCityModel = new CityModel({
      name,
      country,
      active: 1,
    })

    await newCityModel.save()
  }

  // Soft delete
  async removeCity(_id: string) {
    await CityModel.findByIdAndUpdate(_id, { active: 0 })
  }
}

export default CityService
