"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const builderSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    active: Number,
}, { collection: 'builder', timestamps: true });
builderSchema.index({ name: 1 });
exports.default = (0, mongoose_1.model)('Builder', builderSchema);
//# sourceMappingURL=BuilderModel.js.map