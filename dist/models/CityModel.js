"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const citySchema = new mongoose_1.Schema({
    name: String,
    country: String,
    active: Number,
}, { collection: 'city', timestamps: true });
citySchema.index({ name: 1 });
exports.default = (0, mongoose_1.model)('City', citySchema);
//# sourceMappingURL=CityModel.js.map