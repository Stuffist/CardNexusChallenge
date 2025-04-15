FROM node:18

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y postgresql-client
RUN npm install

COPY . .

RUN npx prisma generate

COPY backend-entrypoint.sh /app/backend-entrypoint.sh
RUN chmod +x /app/backend-entrypoint.sh

ENTRYPOINT ["/app/backend-entrypoint.sh"]