"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cardRoutes_1 = __importDefault(require("./routes/cardRoutes"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const rarityRoutes_1 = __importDefault(require("./routes/rarityRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/', indexRoutes_1.default); // Home test form
app.use('/cards', cardRoutes_1.default); // Card search API
app.use('/rarities', rarityRoutes_1.default); // Gets available rariry
// Error handling
app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map