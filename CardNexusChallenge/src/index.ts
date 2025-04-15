import express from 'express';
import cors from 'cors';
import cardsRoute from './routes/cardRoutes';
import indexRoute from './routes/indexRoutes';
import rarityRoute from './routes/rarityRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/', indexRoute);      // Home test form
app.use('/cards', cardsRoute); // Card search API
app.use('/rarities', rarityRoute); // Gets available rariry

// Error handling
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () =>
{
    console.log(`Server running at http://localhost:${PORT}`);
});
