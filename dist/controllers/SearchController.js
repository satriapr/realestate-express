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
const lodash_1 = require("lodash");
const Constant_1 = __importDefault(require("../constants/Constant"));
const response_1 = require("../utils/response");
// Controller handle request and response.
class SearchController {
    constructor(projectService, builderService, cityService) {
        this.projectService = projectService;
        this.builderService = builderService;
        this.cityService = cityService;
    }
    getSearch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { queryStr } = req.query;
                // Query collections asynchronously, limit 5
                const [projects, builders, cities] = yield Promise.all([
                    this.projectService.findProjects(queryStr, Constant_1.default.DEFAULT_PER_PAGE_FOR_SEARCH),
                    this.builderService.findBuilders(queryStr, Constant_1.default.DEFAULT_PER_PAGE_FOR_SEARCH),
                    this.cityService.findCities(queryStr, Constant_1.default.DEFAULT_PER_PAGE_FOR_SEARCH)
                ]);
                // Transform data to become response
                const response = {
                    City: cities,
                    Project: projects,
                    Builder: builders
                };
                res.json((0, response_1.responseSuccess)(Constant_1.default.OK.CODE, Constant_1.default.OK.MESSAGE, response));
                return;
            }
            catch (err) {
                throw new Error((0, lodash_1.get)(err, 'message', 'SearchController.getSearch'));
            }
        });
    }
}
exports.default = SearchController;
//# sourceMappingURL=SearchController.js.map