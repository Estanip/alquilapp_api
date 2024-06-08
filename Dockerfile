FROM node:20-alpine3.20 as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM node:20-alpine3.20 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine3.20 as prod-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --prod

FROM node:20-alpine3.20 as prod
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/main.js"]

FROM node:20-alpine3.20 as dev
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
CMD ["npm", "run", "start:dev"]