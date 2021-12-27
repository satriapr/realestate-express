import BuilderController from '../BuilderController'
import Constants from '../../constants/Constant'

describe('Builder Controller - getBuilders', () => {
  const mockData = [
    {
      name: 'test 1',
      description: 'description 1',
      active: 1,
      createdAt: '2021-01-01 00:00:00',
      updatedAt: '2021-01-01 00:00:00',
    },
  ]

  it('Should response list of builder', async () => {
    // Mock service with mock data
    const mockBuilderService = {
      findBuilders: jest.fn(async () => mockData),
    }

    const builderController = new BuilderController(
      mockBuilderService as any
    )

    const mockRequest = {
      query: {},
    }

    const mockResponse = {
      json: jest.fn(),
    }

    await builderController.getBuilders(
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
    const mockBuilderService = {
      findBuilders: jest.fn(async () => Promise.reject()),
    }

    const builderController = new BuilderController(
      mockBuilderService as any
    )

    const mockRequest = {
      query: {},
    }

    const mockResponse = {
      response: jest.fn(),
    }

    try {
      await builderController.getBuilders(
        mockRequest as any,
        mockResponse as any
      )
    } catch (error) {
      expect(error).toEqual(new Error('BuilderController.getBuilders'))
    }
  })
})

describe('Builder Controller - storeBuilder', () => {
  it('Should storeBuilder with success', async () => {
    // Mock service with mock data
    const mockBuilderService = {
      saveBuilder: jest.fn(),
    }

    const builderController = new BuilderController(
      mockBuilderService as any
    )

    const mockRequest = {
      body: {
        name: 'test 1',
        description: 'description 1',
        active: 1,
        createdAt: '2021-01-01 00:00:00',
        updatedAt: '2021-01-01 00:00:00',
      },
    }

    const mockResponse = {
      json: jest.fn(),
    }

    await builderController.storeBuilder(
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
    const mockBuilderService = {
      saveBuilder: jest.fn(async () => Promise.reject()),
    }

    const builderController = new BuilderController(
      mockBuilderService as any
    )

    const mockRequest = {
      body: {
        name: 'test 1',
        description: 'description 1',
        active: 1,
        createdAt: '2021-01-01 00:00:00',
        updatedAt: '2021-01-01 00:00:00',
      },
    }

    const mockResponse = {
      response: jest.fn(),
    }

    try {
      await builderController.storeBuilder(
        mockRequest as any,
        mockResponse as any
      )
    } catch (error) {
      expect(error).toEqual(new Error('BuilderController.storeBuilder'))
    }
  })
})

describe('Builder Controller - deleteBuilder', () => {
  it('Should deleteBuilder with success', async () => {
    // Mock service with mock data
    const mockBuilderService = {
      removeBuilder: jest.fn(),
    }

    const builderController = new BuilderController(
      mockBuilderService as any
    )

    const mockRequest = {
      params: {
        _id: '61b5b832643f28575d569eb3',
      },
    }

    const mockResponse = {
      json: jest.fn(),
    }

    await builderController.deleteBuilder(
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
    const mockBuilderService = {
      removeBuilder: jest.fn(async () => Promise.reject()),
    }

    const builderController = new BuilderController(
      mockBuilderService as any
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
      await builderController.deleteBuilder(
        mockRequest as any,
        mockResponse as any
      )
    } catch (error) {
      expect(error).toEqual(new Error('BuilderController.deleteBuilder'))
    }
  })
})
