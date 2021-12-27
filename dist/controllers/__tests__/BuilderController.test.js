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
const BuilderController_1 = __importDefault(require("../BuilderController"));
const Constant_1 = __importDefault(require("../../constants/Constant"));
describe('Builder Controller - getBuilders', () => {
    const mockData = [
        {
            name: 'test 1',
            description: 'description 1',
            active: 1,
            createdAt: '2021-01-01 00:00:00',
            updatedAt: '2021-01-01 00:00:00',
        },
    ];
    it('Should response list of builder', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with mock data
        const mockBuilderService = {
            findBuilders: jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return mockData; })),
        };
        const builderController = new BuilderController_1.default(mockBuilderService);
        const mockRequest = {
            query: {},
        };
        const mockResponse = {
            json: jest.fn(),
        };
        yield builderController.getBuilders(mockRequest, mockResponse);
        expect(mockResponse.json).toBeCalledWith({
            data: mockData,
            message: Constant_1.default.OK.MESSAGE,
            statusCode: Constant_1.default.OK.CODE,
        });
    }));
    it('Should response error', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with promise reject
        const mockBuilderService = {
            findBuilders: jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return Promise.reject(); })),
        };
        const builderController = new BuilderController_1.default(mockBuilderService);
        const mockRequest = {
            query: {},
        };
        const mockResponse = {
            response: jest.fn(),
        };
        try {
            yield builderController.getBuilders(mockRequest, mockResponse);
        }
        catch (error) {
            expect(error).toEqual(new Error('BuilderController.getBuilders'));
        }
    }));
});
describe('Builder Controller - storeBuilder', () => {
    it('Should storeBuilder with success', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with mock data
        const mockBuilderService = {
            saveBuilder: jest.fn(),
        };
        const builderController = new BuilderController_1.default(mockBuilderService);
        const mockRequest = {
            body: {
                name: 'test 1',
                description: 'description 1',
                active: 1,
                createdAt: '2021-01-01 00:00:00',
                updatedAt: '2021-01-01 00:00:00',
            },
        };
        const mockResponse = {
            json: jest.fn(),
        };
        yield builderController.storeBuilder(mockRequest, mockResponse);
        expect(mockResponse.json).toBeCalledWith({
            data: {},
            message: Constant_1.default.OK.MESSAGE,
            statusCode: Constant_1.default.OK.CODE,
        });
    }));
    it('Should response error', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with promise reject
        const mockBuilderService = {
            saveBuilder: jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return Promise.reject(); })),
        };
        const builderController = new BuilderController_1.default(mockBuilderService);
        const mockRequest = {
            body: {
                name: 'test 1',
                description: 'description 1',
                active: 1,
                createdAt: '2021-01-01 00:00:00',
                updatedAt: '2021-01-01 00:00:00',
            },
        };
        const mockResponse = {
            response: jest.fn(),
        };
        try {
            yield builderController.storeBuilder(mockRequest, mockResponse);
        }
        catch (error) {
            expect(error).toEqual(new Error('BuilderController.storeBuilder'));
        }
    }));
});
describe('Builder Controller - deleteBuilder', () => {
    it('Should deleteBuilder with success', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with mock data
        const mockBuilderService = {
            removeBuilder: jest.fn(),
        };
        const builderController = new BuilderController_1.default(mockBuilderService);
        const mockRequest = {
            params: {
                _id: '61b5b832643f28575d569eb3',
            },
        };
        const mockResponse = {
            json: jest.fn(),
        };
        yield builderController.deleteBuilder(mockRequest, mockResponse);
        expect(mockResponse.json).toBeCalledWith({
            data: {},
            message: Constant_1.default.NO_CONTENT.MESSAGE,
            statusCode: Constant_1.default.NO_CONTENT.CODE,
        });
    }));
    it('Should response error', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock service with promise reject
        const mockBuilderService = {
            removeBuilder: jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { return Promise.reject(); })),
        };
        const builderController = new BuilderController_1.default(mockBuilderService);
        const mockRequest = {
            params: {
                _id: '61b5b832643f28575d569eb3',
            },
        };
        const mockResponse = {
            response: jest.fn(),
        };
        try {
            yield builderController.deleteBuilder(mockRequest, mockResponse);
        }
        catch (error) {
            expect(error).toEqual(new Error('BuilderController.deleteBuilder'));
        }
    }));
});
//# sourceMappingURL=BuilderController.test.js.map