FROM node:24 AS build
RUN corepack enable
RUN npm install -g typescript

WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY src ./src
COPY tsconfig.json .
COPY .yarn .yarn
COPY .yarnrc.yml .
RUN yarn workspaces focus --production --all && \
    yarn install
RUN npm run build

FROM node:24-alpine AS production
RUN corepack enable

ENV NODE_ENV=production
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY src ./src
COPY tsconfig.json .
COPY .yarn .yarn
COPY .yarnrc.yml .
RUN yarn workspaces focus --production && \
    yarn install --immutable
COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.mjs"]
