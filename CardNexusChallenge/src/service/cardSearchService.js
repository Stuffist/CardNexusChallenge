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
exports.buildCardWhereClause = buildCardWhereClause;
exports.searchCards = searchCards;
const client_1 = require("@prisma/client");
const gameFilter_1 = require("../DAL/filters/gameFilter");
const nameFilter_1 = require("../DAL/filters/nameFilter");
const rarityFilter_1 = require("../DAL/filters/rarityFilter");
const colorFilter_1 = require("../DAL/filters/colorFilter");
const inkCostFilter_1 = require("../DAL/filters/inkCostFilter");
const cardRepository_1 = require("../DAL/cardRepository");
const prismaConnection_1 = __importDefault(require("../../prisma/prismaConnection"));
const { sql } = client_1.Prisma;
function buildCardWhereClause(filters) {
    const all = [
        (0, gameFilter_1.gameFilter)(filters.game),
        (0, nameFilter_1.nameFilter)(filters.name),
        (0, rarityFilter_1.rarityFilter)(filters.rarity),
        (0, colorFilter_1.colorFilter)(filters.color),
        (0, inkCostFilter_1.inkCostFilter)(filters.ink_cost_min, filters.ink_cost_max),
    ].filter(Boolean);
    return all.length
        ? client_1.Prisma.sql `WHERE ${all.reduce((acc, cond, i) => i === 0 ? cond : client_1.Prisma.sql `${acc} AND ${cond}`)}`
        : client_1.Prisma.sql ``;
}
function searchCards(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { game, name, rarity, color, ink_cost_min, ink_cost_max, limit } = params;
        const sqlWhere = buildCardWhereClause(params);
        const safeLimit = Math.min(Number(limit), 1000); // Set hardcode max 1000 - can we worked around with pagination later
        const cardRepo = new cardRepository_1.CardRepository(prismaConnection_1.default);
        const cards = yield cardRepo.getCards(sqlWhere, safeLimit);
        // Mapping DTO
        return cards.map((card) => ({
            id: card.id,
            name: card.name,
            game: card.game,
            rarity: card.rarity,
            gamedata: card.gamedata,
        }));
    });
}
//# sourceMappingURL=cardSearchService.js.map