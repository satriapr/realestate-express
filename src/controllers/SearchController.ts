import { Request, Response } from 'express'
import { get } from 'lodash'

import Constant from '../constants/Constant'
import ProjectService from '../services/ProjectService'
import BuilderService from '../services/BuilderService'
import CityService from '../services/CityService'
import { responseSuccess } from '../utils/response'

import { ISearch } from '../types/SearchType'

interface ISearchController {
  getSearch(req: Request, res: Response): Promise<void>
}

// Controller handle request and response.
class SearchController implements ISearchController {
  constructor(
    private projectService: ProjectService,
    private builderService: BuilderService,
    private cityService: CityService
  ) {}

  async getSearch(req: Request, res: Response): Promise<void> {
    try {
      const { queryStr } = req.query as Pick<ISearch, 'queryStr'>

      // Query collections asynchronously, limit 5
      const [projects, builders, cities] = await Promise.all([
        this.projectService.findProjects(queryStr, Constant.DEFAULT_PER_PAGE_FOR_SEARCH),
        this.builderService.findBuilders(queryStr, Constant.DEFAULT_PER_PAGE_FOR_SEARCH),
        this.cityService.findCities(queryStr, Constant.DEFAULT_PER_PAGE_FOR_SEARCH)
      ])

      // Transform data to become response
      const response = {
        City: cities,
        Project: projects,
        Builder: builders
      }
      res.json(responseSuccess(Constant.OK.CODE, Constant.OK.MESSAGE, response))
      return
    } catch (err) {
      throw new Error(get(err, 'message', 'SearchController.getSearch'))
    }
  }
}

export default SearchController
