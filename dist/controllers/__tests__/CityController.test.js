"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CityController_1 = __importDefault(require("../CityController"));
const Constant_1 = __importDefault(require("../../constants/Constant"));
describe('City Controller - getCities', () => {
    const mockData = [
        {
            name: 'test 1',
            country: 'country 1',
            active: 1,
            createdAt: '2021-01-01 00:00:00',
            updatedAt: '2021-01-01 00:00:00',
        },
    ];
    it('Should response list of city', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with mock data
        const mockCityService = {
            findCities: jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return mockData; })),
        };
        const cityController = new CityController_1.default(mockCityService);
        const mockRequest = {
            query: {},
        };
        const mockResponse = {
            json: jest.fn(),
        };
        yield cityController.getCities(mockRequest, mockResponse);
        expect(mockResponse.json).toBeCalledWith({
            data: mockData,
            message: Constant_1.default.OK.MESSAGE,
            statusCode: Constant_1.default.OK.CODE,
        });
    }));
    it('Should response error', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with promise reject
        const mockCityService = {
            findCities: jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return Promise.reject(); })),
        };
        const cityController = new CityController_1.default(mockCityService);
        const mockRequest = {
            query: {},
        };
        const mockResponse = {
            response: jest.fn(),
        };
        try {
            yield cityController.getCities(mockRequest, mockResponse);
        }
        catch (error) {
            expect(error).toEqual(new Error('CityController.getCities'));
        }
    }));
});
describe('City Controller - storeCity', () => {
    it('Should storeCity with success', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with mock data
        const mockCityService = {
            saveCity: jest.fn(),
        };
        const cityController = new CityController_1.default(mockCityService);
        const mockRequest = {
            body: {
                name: 'test 1',
                country: 'country 1',
                active: 1,
                createdAt: '2021-01-01 00:00:00',
                updatedAt: '2021-01-01 00:00:00',
            },
        };
        const mockResponse = {
            json: jest.fn(),
        };
        yield cityController.storeCity(mockRequest, mockResponse);
        expect(mockResponse.json).toBeCalledWith({
            data: {},
            message: Constant_1.default.OK.MESSAGE,
            statusCode: Constant_1.default.OK.CODE,
        });
    }));
    it('Should response error', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with promise reject
        const mockCityService = {
            saveCity: jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return Promise.reject(); })),
        };
        const cityController = new CityController_1.default(mockCityService);
        const mockRequest = {
            body: {
                name: 'test 1',
                country: 'country 1',
                active: 1,
                createdAt: '2021-01-01 00:00:00',
                updatedAt: '2021-01-01 00:00:00',
            },
        };
        const mockResponse = {
            response: jest.fn(),
        };
        try {
            yield cityController.storeCity(mockRequest, mockResponse);
        }
        catch (error) {
            expect(error).toEqual(new Error('CityController.storeCity'));
        }
    }));
});
describe('City Controller - deleteCity', () => {
    it('Should deleteCity with success', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with mock data
        const mockCityService = {
            removeCity: jest.fn(),
        };
        const cityController = new CityController_1.default(mockCityService);
        const mockRequest = {
            params: {
                _id: '61b5b832643f28575d569eb3',
            },
        };
        const mockResponse = {
            json: jest.fn(),
        };
        yield cityController.deleteCity(mockRequest, mockResponse);
        expect(mockResponse.json).toBeCalledWith({
            data: {},
            message: Constant_1.default.NO_CONTENT.MESSAGE,
            statusCode: Constant_1.default.NO_CONTENT.CODE,
        });
    }));
    it('Should response error', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with promise reject
        const mockCityService = {
            removeCity: jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return Promise.reject(); })),
        };
        const cityController = new CityController_1.default(mockCityService);
        const mockRequest = {
            params: {
                _id: '61b5b832643f28575d569eb3',
            },
        };
        const mockResponse = {
            response: jest.fn(),
        };
        try {
            yield cityController.deleteCity(mockRequest, mockResponse);
        }
        catch (error) {
            expect(error).toEqual(new Error('CityController.deleteCity'));
        }
    }));
});
//# sourceMappingURL=CityController.test.js.map