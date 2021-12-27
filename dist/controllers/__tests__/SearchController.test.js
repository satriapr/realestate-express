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
const SearchController_1 = __importDefault(require("../SearchController"));
const Constant_1 = __importDefault(require("../../constants/Constant"));
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
    ];
    const mockBuildersData = [
        {
            name: 'test 1',
            description: 'description 1',
            active: 1,
            createdAt: '2021-01-01 00:00:00',
            updatedAt: '2021-01-01 00:00:00',
        },
    ];
    const mockCitiesData = [
        {
            name: 'test 1',
            country: 'country 1',
            active: 1,
            createdAt: '2021-01-01 00:00:00',
            updatedAt: '2021-01-01 00:00:00',
        },
    ];
    it('Should response list of search', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with mock data
        const mockProjectService = {
            findProjects: jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return mockProjectsData; })),
        };
        const mockBuilderService = {
            findBuilders: jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return mockBuildersData; })),
        };
        const mockCityService = {
            findCities: jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return mockCitiesData; })),
        };
        const searchController = new SearchController_1.default(mockProjectService, mockBuilderService, mockCityService);
        const mockRequest = {
            query: {},
        };
        const mockResponse = {
            json: jest.fn(),
        };
        yield searchController.getSearch(mockRequest, mockResponse);
        expect(mockResponse.json).toBeCalledWith({
            data: {
                City: mockCitiesData,
                Project: mockProjectsData,
                Builder: mockBuildersData
            },
            message: Constant_1.default.OK.MESSAGE,
            statusCode: Constant_1.default.OK.CODE,
        });
    }));
    it('Should response error', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with mock data
        const mockProjectService = {
            findProjects: jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return Promise.reject(); })),
        };
        const mockBuilderService = {
            findBuilders: jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return Promise.reject(); })),
        };
        const mockCityService = {
            findCities: jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return Promise.reject(); })),
        };
        const searchController = new SearchController_1.default(mockProjectService, mockBuilderService, mockCityService);
        const mockRequest = {
            query: {},
        };
        const mockResponse = {
            response: jest.fn(),
        };
        try {
            yield searchController.getSearch(mockRequest, mockResponse);
        }
        catch (error) {
            expect(error).toEqual(new Error('SearchController.getSearch'));
        }
    }));
});
//# sourceMappingURL=SearchController.test.js.map