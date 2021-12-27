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
const UserModel_1 = __importDefault(require("../models/UserModel"));
const Constant_1 = __importDefault(require("../constants/Constant"));
// Query and business logic
class UserService {
    // Find active record
    findUsers(name, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield UserModel_1.default.find(Object.assign({ active: 1 }, (name ? {
                name: {
                    $regex: name,
                    $options: 'i' // case insensitive
                }
            } : {})))
                .sort({ createdAt: -1 })
                .limit(limit || Constant_1.default.DEFAULT_PER_PAGE);
            return response;
        });
    }
    // Create new record
    saveUser(fullName, role, email, password, mobilePhone) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUserModel = new UserModel_1.default({
                fullName,
                role,
                email,
                password,
                mobilePhone,
                active: 1,
            });
            yield newUserModel.save();
        });
    }
    findOrCreateUser(fullName, facebookId, email, mobilePhone, done) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = yield UserModel_1.default.findOne({
                facebookId
            });
            // If user not exist, create
            if (!currentUser) {
                const newUserModel = new UserModel_1.default({
                    fullName,
                    facebookId,
                    email,
                    mobilePhone,
                    active: 1,
                }).save();
                if (newUserModel) {
                    done(null, newUserModel);
                }
            }
            done(null, currentUser);
        });
    }
    // Soft delete
    removeUser(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield UserModel_1.default.findByIdAndUpdate(_id, { active: 0 });
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map