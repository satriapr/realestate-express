import SearchController from '../SearchController'
import Constants from '../../constants/Constant'

describe('Search Controller - getSearch', () => {
  const mockProjectsData = [
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

  const mockBuildersData = [
    {
      name: 'test 1',
      description: 'description 1',
      active: 1,
      createdAt: '2021-01-01 00:00:00',
      updatedAt: '2021-01-01 00:00:00',
    },
  ]

  const mockCitiesData = [
    {
      name: 'test 1',
      country: 'country 1',
      active: 1,
      createdAt: '2021-01-01 00:00:00',
      updatedAt: '2021-01-01 00:00:00',
    },
  ]

  it('Should response list of search', async () => {
    // Mock service with mock data
    const mockProjectService = {
      findProjects: jest.fn(async () => mockProjectsData),
    }
    const mockBuilderService = {
      findBuilders: jest.fn(async () => mockBuildersData),
    }
    const mockCityService = {
      findCities: jest.fn(async () => mockCitiesData),
    }

    const searchController = new SearchController(
      mockProjectService as any,
      mockBuilderService as any,
      mockCityService as any
    )

    const mockRequest = {
      query: {},
    }

    const mockResponse = {
      json: jest.fn(),
    }

    await searchController.getSearch(
      mockRequest as any,
      mockResponse as any
    )

    expect(mockResponse.json).toBeCalledWith({
      data: {
        City: mockCitiesData,
        Project: mockProjectsData,
        Builder: mockBuildersData
      },
      message: Constants.OK.MESSAGE,
      statusCode: Constants.OK.CODE,
    })
  })

  it('Should response error', async () => {
    // Mock service with mock data
    const mockProjectService = {
      findProjects: jest.fn(async () => Promise.reject()),
    }
    const mockBuilderService = {
      findBuilders: jest.fn(async () => Promise.reject()),
    }
    const mockCityService = {
      findCities: jest.fn(async () => Promise.reject()),
    }

    const searchController = new SearchController(
      mockProjectService as any,
      mockBuilderService as any,
      mockCityService as any
    )

    const mockRequest = {
      query: {},
    }

    const mockResponse = {
      response: jest.fn(),
    }

    try {
      await searchController.getSearch(
        mockRequest as any,
        mockResponse as any
      )
    } catch (error) {
      expect(error).toEqual(new Error('SearchController.getSearch'))
    }
  })
})
