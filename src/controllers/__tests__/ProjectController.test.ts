import ProjectController from '../ProjectController'
import Constants from '../../constants/Constant'

describe('Project Controller - getProjects', () => {
  const mockData = [
    {
      builder: { _id: '61b5b832643f28575d569eb3' },
      city: { _id: '61b5b832643f28575d569ec3' },
      name: 'test 1',
      description: 'description 1',
      type: 'stat 1',
      price: 150000,
      location: 'California',
      active: 1,
      createdAt: '2021-01-01 00:00:00',
      updatedAt: '2021-01-01 00:00:00',
    },
  ]

  it('Should response list of project', async () => {
    // Mock service with mock data
    const mockProjectService = {
      findProjects: jest.fn(async () => mockData),
    }

    const projectController = new ProjectController(
      mockProjectService as any
    )

    const mockRequest = {
      query: {},
    }

    const mockResponse = {
      json: jest.fn(),
    }

    await projectController.getProjects(
      mockRequest as any,
      mockResponse as any
    )

    expect(mockResponse.json).toBeCalledWith({
      data: mockData,
      message: Constants.OK.MESSAGE,
      statusCode: Constants.OK.CODE,
    })
  })

  it('Should response error', async () => {
    // Mock service with promise reject
    const mockProjectService = {
      findProjects: jest.fn(async () => Promise.reject()),
    }

    const projectController = new ProjectController(
      mockProjectService as any
    )

    const mockRequest = {
      query: {},
    }

    const mockResponse = {
      response: jest.fn(),
    }

    try {
      await projectController.getProjects(
        mockRequest as any,
        mockResponse as any
      )
    } catch (error) {
      expect(error).toEqual(new Error('ProjectController.getProjects'))
    }
  })
})

describe('Project Controller - storeProject', () => {
  it('Should storeProject with success', async () => {
    // Mock service with mock data
    const mockProjectService = {
      saveProject: jest.fn(),
    }

    const projectController = new ProjectController(
      mockProjectService as any
    )

    const mockRequest = {
      body: {
        builder: { _id: '61b5b832643f28575d569eb3' },
        city: { _id: '61b5b832643f28575d569ec3' },
        name: 'test 1',
        description: 'description 1',
        type: 'stat 1',
        price: 150000,
        location: 'California',
        amenities: 'Free Wifi, Smart Lock',
        active: 1,
        createdAt: '2021-01-01 00:00:00',
        updatedAt: '2021-01-01 00:00:00',
      },
    }

    const mockResponse = {
      json: jest.fn(),
    }

    await projectController.storeProject(
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
    const mockProjectService = {
      saveProject: jest.fn(async () => Promise.reject()),
    }

    const projectController = new ProjectController(
      mockProjectService as any
    )

    const mockRequest = {
      body: {
        builder: { _id: '61b5b832643f28575d569eb3' },
        city: { _id: '61b5b832643f28575d569ec3' },
        name: 'test 1',
        description: 'description 1',
        type: 'stat 1',
        price: 150000,
        location: 'California',
        active: 1,
        createdAt: '2021-01-01 00:00:00',
        updatedAt: '2021-01-01 00:00:00',
      },
    }

    const mockResponse = {
      response: jest.fn(),
    }

    try {
      await projectController.storeProject(
        mockRequest as any,
        mockResponse as any
      )
    } catch (error) {
      expect(error).toEqual(new Error('ProjectController.storeProject'))
    }
  })
})

describe('Project Controller - deleteProject', () => {
  it('Should deleteProject with success', async () => {
    // Mock service with mock data
    const mockProjectService = {
      removeProject: jest.fn(),
    }

    const projectController = new ProjectController(
      mockProjectService as any
    )

    const mockRequest = {
      params: {
        _id: '61b5b832643f28575d569eb3',
      },
    }

    const mockResponse = {
      json: jest.fn(),
    }

    await projectController.deleteProject(
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
    const mockProjectService = {
      removeProject: jest.fn(async () => Promise.reject()),
    }

    const projectController = new ProjectController(
      mockProjectService as any
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
      await projectController.deleteProject(
        mockRequest as any,
        mockResponse as any
      )
    } catch (error) {
      expect(error).toEqual(new Error('ProjectController.deleteProject'))
    }
  })
})
