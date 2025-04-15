import { seedRarities } from '../src/utils/rarityTableFiller';
import { importAllCards } from '../src/utils/cardImport';

async function runSeed()
{
    try
    {
        await seedRarities();
        console.log('Rarities seeded');

        await importAllCards();
        console.log('Data import OK');
    }
    catch (err)
    {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
}

runSeed();