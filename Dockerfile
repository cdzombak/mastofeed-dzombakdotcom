FROM node:24 AS build
RUN corepack enable
RUN npm install -g typescript

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn workspaces focus --all && \
    yarn install
COPY . .
RUN npm run build

FROM node:24-alpine AS production
RUN corepack enable

ENV NODE_ENV=production
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn workspaces focus --production && \
    yarn install --immutable
COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]
