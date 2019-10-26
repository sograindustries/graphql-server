FROM node:8-slim

WORKDIR /graphql-server

COPY package.json .
RUN yarn

COPY tsconfig.json .
COPY codegen.yml .
COPY jest.config.js .
# COPY jest-dynamodb-config.js .
COPY src ./src

RUN ls

RUN yarn build

CMD ["yarn", "test"]
