import { Request, Response } from 'express'
import { get } from 'lodash'

import Constant from '../constants/Constant'
import CityService from '../services/CityService'
import { responseSuccess } from '../utils/response'

import { ICity } from '../types/CityType'

interface ICityController {
  getCities(req: Request, res: Response): Promise<void>
  storeCity(req: Request, res: Response): Promise<void>
  deleteCity(req: Request, res: Response): Promise<void>
}

// Controller handle request and response.
class CityController implements ICityController {
  constructor(private cityService: CityService) {}

  async getCities(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.query as Pick<ICity, 'name'>
      const response: ICity[] = await this.cityService.findCities(name)
      res.json(responseSuccess(Constant.OK.CODE, Constant.OK.MESSAGE, response))
      return
    } catch (err) {
      throw new Error(get(err, 'message', 'CityController.getCities'))
    }
  }

  async storeCity(req: Request, res: Response): Promise<void> {
    try {
      const { name, country } = req.body as ICity
      await this.cityService.saveCity(
        name,
        country,
      )
      res.json(responseSuccess(Constant.OK.CODE, Constant.OK.MESSAGE, {}))
      return
    } catch (err) {
      throw new Error(get(err, 'message', 'CityController.storeCity'))
    }
  }

  async deleteCity(req: Request, res: Response): Promise<void> {
    try {
      const { _id } = req.params as Pick<ICity, '_id'>
      await this.cityService.removeCity(_id)
      res.json(
        responseSuccess(
          Constant.NO_CONTENT.CODE,
          Constant.NO_CONTENT.MESSAGE,
          {}
        )
      )
    } catch (err) {
      throw new Error(get(err, 'message', 'CityController.deleteCity'))
    }
  }
}

export default CityController
