# Card Nexus Challenge

This project is a backend system built in TypeScript, using PostgreSQL and Prisma ORM, to unify and serve card data from multiple trading card games (TCGs) such as Magic: The Gathering and Lorcana.

---

## ⚡ TL;DR

- **Start everything with Docker Compose**:
  ```bash
  docker-compose up
  ```
- Once ready, open [search form](http://localhost:3000)

- Use the built-in search form on the homepage to test card queries across MTG and Lorcana.

---

## ✅ Tech stack

- **Node.js / TypeScript**
- **Express** for the backend API
- **Prisma** as the ORM
- **PostgreSQL** for persistence
- **Zod** for schema validation
- **Jest** for unit testing
- **Docker / Docker Compose** for containerized deployment

---

## 📦 Data model

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

## 🔍 Modeling decisions

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

## ⚙️ Performance considerations

To ensure the backend performs well even as more games and cards are added, several optimizations were considered:

### ✅ PostgreSQL Indexing
- A **GIN index** is used on the `gamedata` JSONB column, allowing efficient filtering on dynamic fields like `color` and `ink_cost`.
- Indexes on `game` and `rarityId` support fast filtering by game and joining rarity data.

### 🧠 Application-level Caching (Potential Improvements)
- **Rarity list caching** could be done in memory since rarities are rarely updated. This would avoid repeated database hits when importing or filtering cards.
- **Search filters** (e.g. repeated queries with identical filters) could be cached short-term in memory (e.g., with `node-cache`) or externally via Redis if scaling out.
- **Form data (like rarities)** could be cached at startup or behind a dedicated `/config` endpoint.

These techniques can be introduced progressively depending on traffic volume and data size.


---

## 🔄 Unified search endpoint

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

## 🧪 Running tests

```bash
npm install
npm test
```

---

## 🛠️ What can be improved

This project was completed as a technical exercise and learning opportunity — here's a list of areas that could be enhanced or refined:

- **First time using TypeScript**:  
  I did my best to follow good patterns and conventions, but some design decisions may not yet reflect best practices used in large-scale or production TypeScript projects.

- **Game and rarity configuration**:  
  Currently, the list of supported games and rarities is kind of hardcoded. These could ideally be loaded from a central configuration file or service to better support dynamic or future games - that's something I didn't explore yet.

- **Caching strategy**:  
  As mentionned in the Performance chapter earlier, some little tweaks can be added to cache some data and fetch them only once. Also we could consider in the long run an actual cache layer over the DB if needed (can be added easily thanks to the repository architecture).

- **Search form UX (multi-select)**:  
  The HTML `<select multiple>` input has limited usability — browsers sometimes restrict multi-select to shift-selection only (rather than ctrl+click). There is no UI hint or option to deselect once selected. A more user-friendly UI (e.g., checkboxes, custom components) could improve this.

- **Rarity ordering**:  
  The `rarity` table could include a `weight` or `order` column to support filtering logic like “rarity >= Uncommon” or consistent sorting across games.

- **Test coverage**:  
  The current test suite covers filter logic and basic query construction. More integration tests (e.g., API-level, DAL-level with mocks) could be added. I added only a couple of test I needed during the development.

- **No frontend framework**:  
  The UI is raw HTML/JS for simplicity. A modern framework like React or Vue would make the search interface more dynamic and user-friendly, but I didn't want to spend too much time on frontend and keep the focus on backend code.


