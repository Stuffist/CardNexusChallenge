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
exports.seedRarities = seedRarities;
const rarityRepository_1 = require("../DAL/rarityRepository");
const prismaConnection_1 = __importDefault(require("../../prisma/prismaConnection"));
const rarities = [{ game: 'MTG', name: 'common' },
    { game: 'MTG', name: 'uncommon' },
    { game: 'MTG', name: 'rare' },
    { game: 'MTG', name: 'mythic' },
    { game: 'MTG', name: 'special' },
    { game: 'Lorcana', name: 'Common' },
    { game: 'Lorcana', name: 'Uncommon' },
    { game: 'Lorcana', name: 'Rare' },
    { game: 'Lorcana', name: 'Super Rare' },
    { game: 'Lorcana', name: 'Legendary' },
    { game: 'Lorcana', name: 'Enchanted' },
    { game: 'Lorcana', name: 'Promo' }];
function seedRarities() {
    return __awaiter(this, void 0, void 0, function* () {
        const rarityRepo = new rarityRepository_1.RarityRepository(prismaConnection_1.default);
        yield rarityRepo.createMany(rarities, true);
        yield prismaConnection_1.default.$disconnect();
    });
}
//# sourceMappingURL=rarityTableFiller.js.map