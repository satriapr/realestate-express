import { IUser } from '../types/UserType'
import UserModel from '../models/UserModel'
import Constant from '../constants/Constant'

interface IUserService {
  findUsers(name: string, limit?: number): Promise<IUser[]>
  saveUser(
    fullName: string,
    role: string,
    email: string,
    password: string,
    mobilePhone: string
  ): Promise<void>
  removeUser(_id: string): Promise<void>
}

// Query and business logic
class UserService implements IUserService {
  // Find active record
  async findUsers(name: string, limit?: number): Promise<IUser[]> {
    const response = await UserModel.find({
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
  async saveUser(
    fullName: string,
    role: string,
    email: string,
    password: string,
    mobilePhone: string
  ) {
    const newUserModel = new UserModel({
      fullName,
      role,
      email,
      password,
      mobilePhone,
      active: 1,
    })

    await newUserModel.save()
  }

  async findOrCreateUser(
    fullName: string,
    facebookId: string,
    email: string,
    mobilePhone: string,
    done: any
  ) {
    const currentUser = await UserModel.findOne({
      facebookId
    });

    // If user not exist, create
    if(!currentUser) {
      const newUserModel = new UserModel({
        fullName,
        facebookId,
        email,
        mobilePhone,
        active: 1,
      }).save()

      if (newUserModel) {
        done(null, newUserModel);
      }
    }
    done(null, currentUser);
  }

  // Soft delete
  async removeUser(_id: string) {
    await UserModel.findByIdAndUpdate(_id, { active: 0 })
  }
}

export default UserService
