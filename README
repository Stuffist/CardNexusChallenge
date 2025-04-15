# Card Nexus Challenge

This project is a backend system built in TypeScript, using PostgreSQL and Prisma ORM, to unify and serve card data from multiple trading card games (TCGs) such as Magic: The Gathering and Lorcana.

---

## ⚡ TL;DR

- **Start everything with Docker Compose**:
  ```bash
  docker-compose up --build
  ```
- Once ready, open [search form](http://localhost:3000)

- Use the built-in search form on the homepage to test card queries across MTG and Lorcana.

---

## ✅ Tech Stack

- **Node.js / TypeScript**
- **Express** for the backend API
- **Prisma** as the ORM
- **PostgreSQL** for persistence
- **Zod** for schema validation
- **Jest** for unit testing
- **Docker / Docker Compose** for containerized deployment

---

## 📦 Data Model

- **Card**
  - `id: string`
  - `name: string`
  - `game: enum (MTG | Lorcana)`
  - `rarityId: FK -> Rarity`
  - `gamedata: JSONB` — holds game-specific fields like `color`, `ink_cost`

- **Rarity**
  - `id: number`
  - `name: string` (e.g. `Common`, `Rare`, etc.)
  - `game: enum` — scoped to the game

---

## 🔍 Modeling Decisions

- **PostgreSQL** was chosen for its:
  - Robust support for complex querying
  - Native JSONB fields (for dynamic game-specific attributes)
  - Advanced indexing and full-text search options (GIN, GIST)

- **Rarity as a separate table**:
  - Normalized structure enables filtering, ordering, and deduplication
  - Efficient for lookup and future expansion
  - Enforces uniqueness per game (`[name, game]`)
  - Can be enhanced with a "Weight" to order/compare rarity

- **Card table paritionning + Game-specific attributes (`color`, `ink_cost`) stored in `gamedata` JSONB**:
  - New TCG just means new partition
  - Flexible schema for accommodating different TCGs
  - Avoids cluttering the base `Card` model with nullable fields (comparing to table inheritance f.e.)
  - Enables indexing and querying using PostgreSQL’s JSONB capabilities

---

## 🔄 Unified Search Endpoint

Supports flexible filters:
- Partial name match
- Multiple values for `color`, `rarity`
- Ranges for numeric fields (`ink_cost`)
- Game filter

Uses Prisma `$queryRaw` with SQL-safe dynamic query builder for performance and safety.

---

## ✅ Tests

- Jest test suite with unit tests on:
  - Filter builders (`colorFilter`, `rarityFilter`, etc.)
  - Query construction (`cardQueryBuilder`)
- Type-safe validation using Zod

---

## 🚀 Deployment

- Runs entirely in Docker with:
  - Postgres DB container
  - Backend container
- Automatic DB setup (schema push, partitioning, seeding) at startup

```bash
docker-compose up --build
```

Minimal search form is available on `localhost:3000`. API is also usable through standard HTTP request:
```bash
curl http://localhost:3000/cards?rarity=Rare,rare // All rare cards from both games
curl http://localhost:3000/cards?name=dragon      // All cards containing "dragon" from both games
curl http://localhost:3000/cards?game=MTG&color=U,W,null&limit=100 // 100 first MTG cards that Blue, White or colorless

```
Available filters:
## 🔎 API Filters

| Filter         | Type               | Description                                                                 | Example                                                                                  |
|----------------|--------------------|-----------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| `game`         | `string`           | Filter by game (`MTG`, `Lorcana`)                                           | `curl "http://localhost:3000/cards?game=MTG"`                                            |
| `name`         | `string` (partial) | Case-insensitive partial name search (`ILIKE`)                              | `curl "http://localhost:3000/cards?name=bolt"`                                           |
| `rarity`       | `string[]`         | One or more rarity names (`Common`, `Rare`, etc.)                           | `curl "http://localhost:3000/cards?rarity=Rare,Uncommon"`                                |
| `color`        | `string[]`         | MTG-specific: One or more colors (`W`, `U`, `B`, `R`, `G`, `null`)          | `curl "http://localhost:3000/cards?game=MTG&color=U,W,null"`                             |
| `ink_cost_min` | `number`           | Lorcana-specific: ink cost minimum (inclusive)                              | `curl "http://localhost:3000/cards?game=Lorcana&ink_cost_min=2"`                         |
| `ink_cost_max` | `number`           | Lorcana-specific: ink cost maximum (inclusive)                              | `curl "http://localhost:3000/cards?game=Lorcana&ink_cost_max=5"`                         |
| `limit`        | `number`           | Max number of results (default: 100, max: 1000)                              | `curl "http://localhost:3000/cards?limit=50"`                                            |
| *(combined)*   | —                  | Combine filters (e.g., by game, name, rarity)                               | `curl "http://localhost:3000/cards?name=dragon&rarity=Rare"`                            |


---

## 🧪 Running Tests

```bash
npm install
npm test
```


