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
exports.CardRepository = void 0;
const client_1 = require("@prisma/client");
class CardRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getCardById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.card.findUnique({ where: { id } });
        });
    }
    upsertCard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.card.upsert({
                where: { id: data.id },
                update: {},
                create: {
                    id: data.id,
                    name: data.name,
                    game: data.game,
                    rarityId: data.rarityId,
                },
            });
        });
    }
    createMany(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.card.createMany({
                data,
                skipDuplicates: true,
            });
        });
    }
    getCards(where, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.$queryRaw(client_1.Prisma.sql `
            SELECT card.*, rarity.name as rarity
            FROM card
            JOIN rarity ON card."rarityId" = rarity.id
            ${where}
            LIMIT ${limit}`);
        });
    }
}
exports.CardRepository = CardRepository;
//# sourceMappingURL=cardRepository.js.map