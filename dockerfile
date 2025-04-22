FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Set correct DATABASE_URL for Docker
ENV DATABASE_URL="sqlserver://db:1433;database=expense_tracker_prod;user=sa;password=Strong_Password123;trustServerCertificate=true"

# Generate Prisma Client (without connecting to DB)
RUN npx prisma generate

RUN npm run build

EXPOSE 3000

# When the database is ready, push the DB and start the app
CMD ["/bin/sh", "-c", "npx prisma db push && npm run start:prod"]