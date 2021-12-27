import { Request, Response } from 'express'
import { get } from 'lodash'

import Constant from '../constants/Constant'
import BuilderService from '../services/BuilderService'
import { responseSuccess } from '../utils/response'

import { IBuilder } from '../types/BuilderType'

interface IBuilderController {
  getBuilders(req: Request, res: Response): Promise<void>
  storeBuilder(req: Request, res: Response): Promise<void>
  deleteBuilder(req: Request, res: Response): Promise<void>
}

// Controller handle request and response.
class BuilderController implements IBuilderController {
  constructor(private builderService: BuilderService) {}

  async getBuilders(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.query as Pick<IBuilder, 'name'>
      const response: IBuilder[] = await this.builderService.findBuilders(name)
      res.json(responseSuccess(Constant.OK.CODE, Constant.OK.MESSAGE, response))
      return
    } catch (err) {
      throw new Error(get(err, 'message', 'BuilderController.getBuilders'))
    }
  }

  async storeBuilder(req: Request, res: Response): Promise<void> {
    try {
      const { name, description } = req.body as IBuilder
      await this.builderService.saveBuilder(
        name,
        description,
      )
      res.json(responseSuccess(Constant.OK.CODE, Constant.OK.MESSAGE, {}))
      return
    } catch (err) {
      throw new Error(get(err, 'message', 'BuilderController.storeBuilder'))
    }
  }

  async deleteBuilder(req: Request, res: Response): Promise<void> {
    try {
      const { _id } = req.params as Pick<IBuilder, '_id'>
      await this.builderService.removeBuilder(_id)
      res.json(
        responseSuccess(
          Constant.NO_CONTENT.CODE,
          Constant.NO_CONTENT.MESSAGE,
          {}
        )
      )
    } catch (err) {
      throw new Error(get(err, 'message', 'BuilderController.deleteBuilder'))
    }
  }
}

export default BuilderController
