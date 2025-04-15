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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cardSearchService_1 = require("../service/cardSearchService");
const querySchema_1 = require("../schemas/querySchema");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = Object.assign({}, req.query);
        // Colors and rarities can be passed has strings - normalize them in a array
        if (typeof query.color === 'string') {
            query.color = query.color.split(',');
        }
        if (typeof query.rarity === 'string') {
            query.rarity = query.rarity.split(',');
        }
        const parsedQuery = querySchema_1.QuerySchema.safeParse(query);
        if (!parsedQuery.success) {
            res.status(400).json({ error: parsedQuery.error.format() });
            return;
        }
        const cards = yield (0, cardSearchService_1.searchCards)(parsedQuery.data);
        res.json(cards);
    }
    catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
//# sourceMappingURL=cardRoutes.js.map