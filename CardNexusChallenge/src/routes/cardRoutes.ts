import { Router } from 'express';
import { searchCards } from '../service/cardSearchService';
import { QuerySchema } from '../schemas/querySchema';

const router = Router();

router.get('/', async (req, res) =>
{
    try
    {
        const query = { ...req.query };

        // Colors and rarities can be passed has strings - normalize them in a array
        if (typeof query.color === 'string')
        {
            query.color = query.color.split(',');
        }
        if (typeof query.rarity === 'string')
        {
            query.rarity = query.rarity.split(',');
        }

        const parsedQuery = QuerySchema.safeParse(query);
        if (!parsedQuery.success)
        {
            res.status(400).json({ error: parsedQuery.error.format() });
            return;
        }

        const cards = await searchCards(parsedQuery.data);
        res.json(cards);
    }
    catch (err: any)
    {
        console.error('Search error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
