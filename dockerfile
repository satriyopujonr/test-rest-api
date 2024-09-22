# Dockerfile

# Stage 1: Build the application
FROM node:18 AS builder
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build

# Stage 2: Run the application
FROM node:18
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --production
CMD ["node", "dist/main"]
