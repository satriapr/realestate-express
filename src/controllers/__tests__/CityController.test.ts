import CityController from '../CityController'
import Constants from '../../constants/Constant'

describe('City Controller - getCities', () => {
  const mockData = [
    {
      name: 'test 1',
      country: 'country 1',
      active: 1,
      createdAt: '2021-01-01 00:00:00',
      updatedAt: '2021-01-01 00:00:00',
    },
  ]

  it('Should response list of city', async () => {
    // Mock service with mock data
    const mockCityService = {
      findCities: jest.fn(async () => mockData),
    }

    const cityController = new CityController(
      mockCityService as any
    )

    const mockRequest = {
      query: {},
    }

    const mockResponse = {
      json: jest.fn(),
    }

    await cityController.getCities(
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
    const mockCityService = {
      findCities: jest.fn(async () => Promise.reject()),
    }

    const cityController = new CityController(
      mockCityService as any
    )

    const mockRequest = {
      query: {},
    }

    const mockResponse = {
      response: jest.fn(),
    }

    try {
      await cityController.getCities(
        mockRequest as any,
        mockResponse as any
      )
    } catch (error) {
      expect(error).toEqual(new Error('CityController.getCities'))
    }
  })
})

describe('City Controller - storeCity', () => {
  it('Should storeCity with success', async () => {
    // Mock service with mock data
    const mockCityService = {
      saveCity: jest.fn(),
    }

    const cityController = new CityController(
      mockCityService as any
    )

    const mockRequest = {
      body: {
        name: 'test 1',
        country: 'country 1',
        active: 1,
        createdAt: '2021-01-01 00:00:00',
        updatedAt: '2021-01-01 00:00:00',
      },
    }

    const mockResponse = {
      json: jest.fn(),
    }

    await cityController.storeCity(
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
    const mockCityService = {
      saveCity: jest.fn(async () => Promise.reject()),
    }

    const cityController = new CityController(
      mockCityService as any
    )

    const mockRequest = {
      body: {
        name: 'test 1',
        country: 'country 1',
        active: 1,
        createdAt: '2021-01-01 00:00:00',
        updatedAt: '2021-01-01 00:00:00',
      },
    }

    const mockResponse = {
      response: jest.fn(),
    }

    try {
      await cityController.storeCity(
        mockRequest as any,
        mockResponse as any
      )
    } catch (error) {
      expect(error).toEqual(new Error('CityController.storeCity'))
    }
  })
})

describe('City Controller - deleteCity', () => {
  it('Should deleteCity with success', async () => {
    // Mock service with mock data
    const mockCityService = {
      removeCity: jest.fn(),
    }

    const cityController = new CityController(
      mockCityService as any
    )

    const mockRequest = {
      params: {
        _id: '61b5b832643f28575d569eb3',
      },
    }

    const mockResponse = {
      json: jest.fn(),
    }

    await cityController.deleteCity(
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
    const mockCityService = {
      removeCity: jest.fn(async () => Promise.reject()),
    }

    const cityController = new CityController(
      mockCityService as any
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
      await cityController.deleteCity(
        mockRequest as any,
        mockResponse as any
      )
    } catch (error) {
      expect(error).toEqual(new Error('CityController.deleteCity'))
    }
  })
})
