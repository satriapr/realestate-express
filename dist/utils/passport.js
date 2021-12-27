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
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const lodash_1 = require("lodash");
const UserModel_1 = __importDefault(require("../models/UserModel"));
// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport_1.default.serializeUser((user, done) => {
    console.log('userSerialize', user);
    done(null, (0, lodash_1.get)(user, '_id'));
});
// deserialize the cookieUserId to user in the database
passport_1.default.deserializeUser((id, done) => {
    console.log('deserializeUser', id);
    UserModel_1.default.findById(id)
        .then(user => {
        done(null, user);
    })
        .catch(e => {
        done(new Error("Failed to deserialize an user"));
    });
});
passport_1.default.use(new passport_facebook_1.default({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/redirect'
}, (accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    const currentUser = yield UserModel_1.default.findOne({
        facebookId: profile.id
    });
    // If user not exist, create
    if (!currentUser) {
        const newUserModel = new UserModel_1.default({
            fullName: profile.displayName,
            facebookId: profile.id,
            // email: profile.name,
            // mobilePhone,
            active: 1,
        }).save();
        if (newUserModel) {
            return cb(null, newUserModel);
        }
    }
    return cb(null, currentUser);
})));
//# sourceMappingURL=passport.js.map