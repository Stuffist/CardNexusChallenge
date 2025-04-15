#!/bin/bash
set -e

echo "Waiting for PostgreSQL to be ready..."

until pg_isready -h db -p 5432 -U postgres; do
  sleep 1
done

echo "PostgreSQL is up!"

echo "Pushing Prisma schema to DB..."
npx prisma db push --force-reset

echo "Applying partitioned card schema..."
psql "$DATABASE_URL" -f prisma/partitioned_card_setup.sql

echo "Seeding database..."
npx ts-node prisma/dbseed.ts

echo "Starting backend server..."
npm run start
