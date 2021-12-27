import { Request, Response } from 'express'
import { get } from 'lodash'

import Constant from '../constants/Constant'
import UserService from '../services/UserService'
import { responseSuccess } from '../utils/response'

import { IUser } from '../types/UserType'

interface IUserController {
  getUsers(req: Request, res: Response): Promise<void>
  storeUser(req: Request, res: Response): Promise<void>
  deleteUser(req: Request, res: Response): Promise<void>
}

// Controller handle request and response.
class UserController implements IUserController {
  constructor(private userService: UserService) {}

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const { fullName } = req.query as Pick<IUser, 'fullName'>
      const response: IUser[] = await this.userService.findUsers(fullName)
      res.json(responseSuccess(Constant.OK.CODE, Constant.OK.MESSAGE, response))
      return
    } catch (err) {
      throw new Error(get(err, 'message', 'UserController.getUsers'))
    }
  }

  async storeUser(req: Request, res: Response): Promise<void> {
    try {
      const { fullName, role, email, password, mobilePhone } = req.body as IUser
      await this.userService.saveUser(
        fullName, 
        role, 
        email, 
        password, 
        mobilePhone
      )
      res.json(responseSuccess(Constant.OK.CODE, Constant.OK.MESSAGE, {}))
      return
    } catch (err) {
      throw new Error(get(err, 'message', 'UserController.storeUser'))
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { _id } = req.params as Pick<IUser, '_id'>
      await this.userService.removeUser(_id)
      res.json(
        responseSuccess(
          Constant.NO_CONTENT.CODE,
          Constant.NO_CONTENT.MESSAGE,
          {}
        )
      )
    } catch (err) {
      throw new Error(get(err, 'message', 'UserController.deleteUser'))
    }
  }
}

export default UserController
