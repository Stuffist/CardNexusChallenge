-- Delete existing table if not partitioned yet (created by Prisma db push)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE c.relname = 'card'
      AND c.relkind = 'r' -- ordinary table
      AND NOT EXISTS (
        SELECT 1
        FROM pg_partitioned_table pt
        WHERE pt.partrelid = c.oid
      )
  ) THEN
    RAISE NOTICE 'Dropping non-partitioned card table';
    EXECUTE 'DROP TABLE IF EXISTS "card" CASCADE';
  END IF;
END $$;

-- Partitioned base table
CREATE TABLE IF NOT EXISTS "card" (
  id TEXT NOT NULL,
  game TEXT NOT NULL,
  name TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "rarityId" INTEGER NOT NULL,
  gamedata JSONB,
  PRIMARY KEY (id, game),
  FOREIGN KEY ("rarityId") REFERENCES rarity(id)
) PARTITION BY LIST (game);

-- Indexes for faster expected queries
CREATE INDEX IF NOT EXISTS idx_card_gamedata ON card USING GIN (gamedata); -- Helps fast gamedata filtering
CREATE INDEX idx_card_ink_cost ON card ((gamedata->>'ink_cost')::int) WHERE game = 'Lorcana'; -- Helps fast min/max ink_cost queries
CREATE INDEX idx_card_color ON card ((gamedata->>'color')) WHERE game = 'MTG'; -- Helps for MTG color filters
CREATE INDEX idx_card_game_rarity ON card (game, "rarityId"); -- Helps for rarity filtering

CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_card_name_trgm ON card USING gin (name gin_trgm_ops); -- Helps partial text search
-- Partition for MTG
CREATE TABLE IF NOT EXISTS "card_mtg"
  PARTITION OF "card" FOR VALUES IN ('MTG');

-- Partition for Lorcana
CREATE TABLE IF NOT EXISTS "card_lorcana"
  PARTITION OF "card" FOR VALUES IN ('Lorcana');
