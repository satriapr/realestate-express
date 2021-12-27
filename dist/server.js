"use strict";
// 'dev': 'tsc -w & nodemon .'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const passportSetup_1 = __importDefault(require("./utils/passportSetup"));
const Constant_1 = __importDefault(require("./constants/Constant"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
// connect mongo
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.is7bh.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose_1.default
    .connect(uri)
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch((error) => {
    throw error;
});
/* Facebook login */
(0, passportSetup_1.default)();
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: [Constant_1.default.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100
}));
// parse cookies
app.use((0, cookie_parser_1.default)());
// initalize passport
app.use(passport_1.default.initialize());
// deserialize cookie from the browser
app.use(passport_1.default.session());
// set up cors to allow us to accept requests from our client
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
}));
// set up auth routes
app.use('/auth', routes_1.default);
const authCheck = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            authenticated: false,
            message: 'user has not been authenticated'
        });
    }
    else {
        next();
    }
};
app.get('/', authCheck, (req, res) => {
    res.status(200).json({
        authenticated: true,
        message: 'user successfully authenticated',
        user: req.user,
        cookies: req.cookies
    });
});
/* End of facebook login */ 
//# sourceMappingURL=server.js.map