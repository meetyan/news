FROM node:16.15.1

WORKDIR /usr/src/app

COPY . .

RUN yarn

CMD yarn deploy
