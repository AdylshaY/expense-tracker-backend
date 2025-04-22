FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Set correct DATABASE_URL for Docker
ENV DATABASE_URL="sqlserver://host.docker.internal:1433;database=expense_tracker_prod;user=sa;password=Admin1234;trustServerCertificate=true"

# Generate Prisma Client
RUN npm run prisma:push-prod

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]