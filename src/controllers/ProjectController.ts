import { Request, Response } from 'express'
import { get } from 'lodash'

import Constant from '../constants/Constant'
import ProjectService from '../services/ProjectService'
import { responseSuccess } from '../utils/response'

import { IProject } from '../types/ProjectType'

interface IProjectController {
  getProjects(req: Request, res: Response): Promise<void>
  storeProject(req: Request, res: Response): Promise<void>
  deleteProject(req: Request, res: Response): Promise<void>
}

// Controller handle request and response.
class ProjectController implements IProjectController {
  constructor(private projectService: ProjectService) {}

  async getProjects(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.query as Pick<IProject, 'name'>
      const response: IProject[] = await this.projectService.findProjects(name)
      res.json(responseSuccess(Constant.OK.CODE, Constant.OK.MESSAGE, response))
      return
    } catch (err) {
      throw new Error(get(err, 'message', 'ProjectController.getProjects'))
    }
  }

  async storeProject(req: Request, res: Response): Promise<void> {
    try {
      const { builder, city, name, description, type, price, location, amenities } = req.body as IProject
      await this.projectService.saveProject(
        builder,
        city,
        name,
        description,
        type,
        price,
        location,
        amenities
      )
      res.json(responseSuccess(Constant.OK.CODE, Constant.OK.MESSAGE, {}))
      return
    } catch (err) {
      throw new Error(get(err, 'message', 'ProjectController.storeProject'))
    }
  }

  async deleteProject(req: Request, res: Response): Promise<void> {
    try {
      const { _id } = req.params as Pick<IProject, '_id'>
      await this.projectService.removeProject(_id)
      res.json(
        responseSuccess(
          Constant.NO_CONTENT.CODE,
          Constant.NO_CONTENT.MESSAGE,
          {}
        )
      )
    } catch (err) {
      throw new Error(get(err, 'message', 'ProjectController.deleteProject'))
    }
  }
}

export default ProjectController
