"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    builder: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Builder' },
    city: { type: mongoose_1.Schema.Types.ObjectId, ref: 'City' },
    name: String,
    description: String,
    type: String,
    price: Number,
    location: String,
    amenities: String,
    active: Number,
}, { collection: 'project', timestamps: true });
projectSchema.index({ name: 1 });
exports.default = (0, mongoose_1.model)('Project', projectSchema);
//# sourceMappingURL=ProjectModel.js.map