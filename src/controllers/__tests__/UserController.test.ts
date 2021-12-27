import UserController from '../UserController'
import Constants from '../../constants/Constant'

describe('UserController - getUsers', () => {
  const mockData = [
    {
      fullName: 'Admin 1',
      role: 'admin',
      email: 'admin@example.com',
      password: '',
      active: 1,
      createdAt: '2021-01-01 00:00:00',
      updatedAt: '2021-01-01 00:00:00',
      mobilePhone: '+6599999999',
    },
  ]

  it('Should response list of user', async () => {
    const mockUserService = {
      findUsers: jest.fn(async () => mockData),
    }

    const userController = new UserController(mockUserService as any)

    const mockRequest = {
      query: {},
    }

    const mockResponse = {
      json: jest.fn(),
    }

    await userController.getUsers(mockRequest as any, mockResponse as any)

    expect(mockResponse.json).toBeCalledWith({
      data: mockData,
      message: Constants.OK.MESSAGE,
      statusCode: Constants.OK.CODE,
    })
  })

  it('Should response error', async () => {
    // Mock service with promise reject
    const mockUserService = {
      findUsers: jest.fn(async () => Promise.reject()),
    }

    const userController = new UserController(mockUserService as any)

    const mockRequest = {
      query: {},
    }

    const mockResponse = {
      response: jest.fn(),
    }

    try {
      await userController.getUsers(mockRequest as any, mockResponse as any)
    } catch (error) {
      expect(error).toEqual(new Error('UserController.getUsers'))
    }
  })
})

describe('User Controller - storeUser', () => {
  it('Should storeUser with success', async () => {
    // Mock service with mock data
    const mockUserService = {
      saveUser: jest.fn(),
    }

    const userController = new UserController(
      mockUserService as any
    )

    const mockRequest = {
      body: {
        fullName: 'Admin 1',
        role: 'admin',
        email: 'admin@example.com',
        password: '',
        active: 1,
        createdAt: '2021-01-01 00:00:00',
        updatedAt: '2021-01-01 00:00:00',
        mobilePhone: '+6599999999',
      },
    }

    const mockResponse = {
      json: jest.fn(),
    }

    await userController.storeUser(
      mockRequest as any,
      mockResponse as any
    )

    expect(mockResponse.json).toBeCalledWith({
      data: {},
      message: Constants.OK.MESSAGE,
      statusCode: Constants.OK.CODE,
    })
  })

  it('Should response error', async () => {
    // Mock service with promise reject
    const mockUserService = {
      saveUser: jest.fn(async () => Promise.reject()),
    }

    const userController = new UserController(
      mockUserService as any
    )

    const mockRequest = {
      body: {
        fullName: 'Admin 1',
        role: 'admin',
        email: 'admin@example.com',
        password: '',
        active: 1,
        createdAt: '2021-01-01 00:00:00',
        updatedAt: '2021-01-01 00:00:00',
        mobilePhone: '+6599999999',
      },
    }

    const mockResponse = {
      response: jest.fn(),
    }

    try {
      await userController.storeUser(
        mockRequest as any,
        mockResponse as any
      )
    } catch (error) {
      expect(error).toEqual(new Error('UserController.storeUser'))
    }
  })
})

describe('User Controller - deleteUser', () => {
  it('Should deleteUser with success', async () => {
    // Mock service with mock data
    const mockUserService = {
      removeUser: jest.fn(),
    }

    const userController = new UserController(
      mockUserService as any
    )

    const mockRequest = {
      params: {
        _id: '61b5b832643f28575d569eb3',
      },
    }

    const mockResponse = {
      json: jest.fn(),
    }

    await userController.deleteUser(
      mockRequest as any,
      mockResponse as any
    )

    expect(mockResponse.json).toBeCalledWith({
      data: {},
      message: Constants.NO_CONTENT.MESSAGE,
      statusCode: Constants.NO_CONTENT.CODE,
    })
  })

  it('Should response error', async () => {
    // Mock service with promise reject
    const mockUserService = {
      removeUser: jest.fn(async () => Promise.reject()),
    }

    const userController = new UserController(
      mockUserService as any
    )

    const mockRequest = {
      params: {
        _id: '61b5b832643f28575d569eb3',
      },
    }

    const mockResponse = {
      response: jest.fn(),
    }

    try {
      await userController.deleteUser(
        mockRequest as any,
        mockResponse as any
      )
    } catch (error) {
      expect(error).toEqual(new Error('UserController.deleteUser'))
    }
  })
})
