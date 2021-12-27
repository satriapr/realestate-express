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
const ProjectModel_1 = __importDefault(require("../models/ProjectModel"));
const CityModel_1 = __importDefault(require("../models/CityModel"));
const BuilderModel_1 = __importDefault(require("../models/BuilderModel"));
const Constant_1 = __importDefault(require("../constants/Constant"));
// Query and business logic
class ProjectService {
    // Find active record
    findProjects(name, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield ProjectModel_1.default.find(Object.assign({ active: 1 }, (name ? {
                name: {
                    $regex: name,
                    $options: 'i' // case insensitive
                }
            } : {})))
                .sort({ createdAt: -1 })
                .limit(limit || Constant_1.default.DEFAULT_PER_PAGE)
                .populate('city', 'name country', CityModel_1.default)
                .populate('builder', 'name description', BuilderModel_1.default);
            return response;
        });
    }
    // Create new record
    saveProject(builder, city, name, description, type, price, location, amenities) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProjectModel = new ProjectModel_1.default({
                builder,
                city,
                name,
                description,
                type,
                price,
                location,
                amenities,
                active: 1,
            });
            yield newProjectModel.save();
        });
    }
    // Soft delete
    removeProject(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ProjectModel_1.default.findByIdAndUpdate(_id, { active: 0 });
        });
    }
}
exports.default = ProjectService;
//# sourceMappingURL=ProjectService.js.map