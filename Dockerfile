FROM node:10-alpine

WORKDIR /graphql-server

COPY package.json .
RUN yarn

COPY tsconfig.json .
COPY codegen.yml .
COPY jest.config.js .
COPY run-tests.sh .
# COPY jest-dynamodb-config.js .
COPY src ./src

RUN ls

RUN yarn build

CMD ["yarn", "test"]
