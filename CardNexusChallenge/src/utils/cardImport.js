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
exports.importCardsFromFile = importCardsFromFile;
exports.importAllCards = importAllCards;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const cardSchema_1 = require("../schemas/cardSchema");
const rarityRepository_1 = require("../DAL/rarityRepository");
const cardRepository_1 = require("../DAL/cardRepository");
const prismaConnection_1 = __importDefault(require("../../prisma/prismaConnection"));
const cardRepo = new cardRepository_1.CardRepository(prismaConnection_1.default);
const rarityRepo = new rarityRepository_1.RarityRepository(prismaConnection_1.default);
function loadJson(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const raw = yield promises_1.default.readFile(filePath, 'utf-8');
        return JSON.parse(raw);
    });
}
function importCardsFromFile(filePath, game) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const rarityMap = yield rarityRepo.getAllAsMap();
        const rawCards = yield loadJson(filePath);
        const batch = [];
        for (const rawCard of rawCards) {
            const card = Object.assign(Object.assign({}, rawCard), { game });
            const parsed = cardSchema_1.CardSchema.safeParse(card);
            if (!parsed.success) {
                console.warn(`Invalid card [id=${card.id}]:`, parsed.error.format());
                continue;
            }
            const rarityId = rarityMap.get(`${game}:${card.rarity}`);
            if (!rarityId) {
                console.warn(`Skipping card ${card.id} - unknown rarity ${card.rarity}`);
                continue;
            }
            const parsedCard = parsed.data;
            const gamedata = {};
            switch (parsedCard.game) {
                case "MTG":
                    gamedata.color = (_a = parsedCard.color) !== null && _a !== void 0 ? _a : null;
                    break;
                case "Lorcana":
                    gamedata.ink_cost = parsedCard.ink_cost;
                    break;
            }
            batch.push({
                id: parsedCard.id,
                name: parsedCard.name,
                game,
                rarityId,
                gamedata
            });
        }
        if (batch.length > 0) {
            try {
                yield cardRepo.createMany(batch);
                console.log(`Imported ${batch.length} cards from ${filePath}`);
            }
            catch (err) {
                console.warn(`Skipped card import: ${err.message}`);
            }
        }
    });
}
function importAllCards() {
    return __awaiter(this, void 0, void 0, function* () {
        const basePath = path_1.default.resolve('data');
        yield importCardsFromFile(path_1.default.join(basePath, 'mtg-cards.json'), 'MTG');
        yield importCardsFromFile(path_1.default.join(basePath, 'lorcana-cards.json'), 'Lorcana');
    });
}
//# sourceMappingURL=cardImport.js.map