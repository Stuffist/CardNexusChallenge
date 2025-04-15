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
const rarityTableFiller_1 = require("../src/utils/rarityTableFiller");
const cardImport_1 = require("../src/utils/cardImport");
function runSeed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, rarityTableFiller_1.seedRarities)();
            console.log('Rarities seeded');
            yield (0, cardImport_1.importAllCards)();
            console.log('Data import OK');
        }
        catch (err) {
            console.error('Seeding failed:', err);
            process.exit(1);
        }
    });
}
runSeed();
//# sourceMappingURL=dbseed.js.map