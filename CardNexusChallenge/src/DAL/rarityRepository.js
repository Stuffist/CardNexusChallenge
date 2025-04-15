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
exports.RarityRepository = void 0;
class RarityRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getOrThrow(name, game) {
        return __awaiter(this, void 0, void 0, function* () {
            const rarity = yield this.prisma.rarity.findUnique({
                where: {
                    name_game: { name, game }
                }
            });
            if (!rarity) {
                throw new Error(`Unknown rarity "${name}" for game "${game}"`);
            }
            return rarity;
        });
    }
    upsert(name, game) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.rarity.upsert({
                where: {
                    name_game: { name, game }
                },
                update: {},
                create: { name, game }
            });
        });
    }
    createMany(rarities, skipDuplicates) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.rarity.createMany({
                data: rarities,
                skipDuplicates: skipDuplicates,
            });
        });
    }
    getAllAsMap() {
        return __awaiter(this, void 0, void 0, function* () {
            const rarities = yield this.findManySorted();
            const map = new Map();
            for (const r of rarities) {
                map.set(`${r.game}:${r.name}`, r.id);
            }
            return map;
        });
    }
    findManySorted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.rarity.findMany({
                orderBy: [{ game: 'asc' }, { id: 'asc' }],
            });
        });
    }
}
exports.RarityRepository = RarityRepository;
;
//# sourceMappingURL=rarityRepository.js.map