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
const ProjectController_1 = __importDefault(require("../ProjectController"));
const Constant_1 = __importDefault(require("../../constants/Constant"));
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
    ];
    it('Should response list of project', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with mock data
        const mockProjectService = {
            findProjects: jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return mockData; })),
        };
        const projectController = new ProjectController_1.default(mockProjectService);
        const mockRequest = {
            query: {},
        };
        const mockResponse = {
            json: jest.fn(),
        };
        yield projectController.getProjects(mockRequest, mockResponse);
        expect(mockResponse.json).toBeCalledWith({
            data: mockData,
            message: Constant_1.default.OK.MESSAGE,
            statusCode: Constant_1.default.OK.CODE,
        });
    }));
    it('Should response error', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with promise reject
        const mockProjectService = {
            findProjects: jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return Promise.reject(); })),
        };
        const projectController = new ProjectController_1.default(mockProjectService);
        const mockRequest = {
            query: {},
        };
        const mockResponse = {
            response: jest.fn(),
        };
        try {
            yield projectController.getProjects(mockRequest, mockResponse);
        }
        catch (error) {
            expect(error).toEqual(new Error('ProjectController.getProjects'));
        }
    }));
});
describe('Project Controller - storeProject', () => {
    it('Should storeProject with success', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with mock data
        const mockProjectService = {
            saveProject: jest.fn(),
        };
        const projectController = new ProjectController_1.default(mockProjectService);
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
        };
        const mockResponse = {
            json: jest.fn(),
        };
        yield projectController.storeProject(mockRequest, mockResponse);
        expect(mockResponse.json).toBeCalledWith({
            data: {},
            message: Constant_1.default.OK.MESSAGE,
            statusCode: Constant_1.default.OK.CODE,
        });
    }));
    it('Should response error', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with promise reject
        const mockProjectService = {
            saveProject: jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return Promise.reject(); })),
        };
        const projectController = new ProjectController_1.default(mockProjectService);
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
        };
        const mockResponse = {
            response: jest.fn(),
        };
        try {
            yield projectController.storeProject(mockRequest, mockResponse);
        }
        catch (error) {
            expect(error).toEqual(new Error('ProjectController.storeProject'));
        }
    }));
});
describe('Project Controller - deleteProject', () => {
    it('Should deleteProject with success', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with mock data
        const mockProjectService = {
            removeProject: jest.fn(),
        };
        const projectController = new ProjectController_1.default(mockProjectService);
        const mockRequest = {
            params: {
                _id: '61b5b832643f28575d569eb3',
            },
        };
        const mockResponse = {
            json: jest.fn(),
        };
        yield projectController.deleteProject(mockRequest, mockResponse);
        expect(mockResponse.json).toBeCalledWith({
            data: {},
            message: Constant_1.default.NO_CONTENT.MESSAGE,
            statusCode: Constant_1.default.NO_CONTENT.CODE,
        });
    }));
    it('Should response error', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with promise reject
        const mockProjectService = {
            removeProject: jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return Promise.reject(); })),
        };
        const projectController = new ProjectController_1.default(mockProjectService);
        const mockRequest = {
            params: {
                _id: '61b5b832643f28575d569eb3',
            },
        };
        const mockResponse = {
            response: jest.fn(),
        };
        try {
            yield projectController.deleteProject(mockRequest, mockResponse);
        }
        catch (error) {
            expect(error).toEqual(new Error('ProjectController.deleteProject'));
        }
    }));
});
//# sourceMappingURL=ProjectController.test.js.map